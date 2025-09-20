import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type WeatherData = {
  main: { temp: number; temp_min: number; temp_max: number };
  weather: { main: string; description: string; icon: string }[];
  name: string;
};

export default function WeatherScreen() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Bhubaneswar"); // default
  const [searchCity, setSearchCity] = useState("");

  const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setCity(cityName);
      } else {
        alert("City not found!");
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
    }
    setLoading(false);
  };

  if (loading || !weather) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading Weather...</Text>
      </View>
    );
  }

  const temp = Math.round(weather.main.temp);
  const tempMax = Math.round(weather.main.temp_max);
  const tempMin = Math.round(weather.main.temp_min);
  const condition = weather.weather[0]?.description || "N/A";

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weather Forecast</Text>

      {/* 🔹 Search Box */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter city..."
          value={searchCity}
          onChangeText={setSearchCity}
        />
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            if (searchCity.trim() !== "") fetchWeather(searchCity);
          }}
        >
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Temperature Box */}
      <View style={styles.card}>
        <Ionicons name="partly-sunny-outline" size={40} color="orange" />
        <Text style={styles.temp}>{temp}°C</Text>
        <Text style={styles.condition}>{condition}</Text>
        <Text style={styles.range}>
          High: {tempMax}°C | Low: {tempMin}°C
        </Text>
        <Text style={styles.city}>📍 {weather.name}</Text>
      </View>

      {/* Rainfall Probability (placeholder for now) */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Rainfall Probability</Text>
        <Text style={styles.probability}>60%</Text>
        <Text style={styles.info}>
          Moderate chance of scattered showers this afternoon.
        </Text>
      </View>

      {/* Heavy Rainfall Alert */}
      <View style={[styles.card, { borderLeftColor: "red", borderLeftWidth: 4 }]}>
        <Text style={styles.alertTitle}>⚠ Heavy Rainfall Alert</Text>
        <Text style={styles.info}>
          Expect significant rainfall and potential flooding in your area. Take
          necessary precautions.
        </Text>
        <TouchableOpacity style={styles.alertBtn}>
          <Text style={styles.alertBtnText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },

  searchRow: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchBtn: {
    marginLeft: 8,
    backgroundColor: "green",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    alignItems: "center",
  },
  temp: { fontSize: 32, fontWeight: "bold", color: "#333", marginTop: 10 },
  condition: { fontSize: 18, color: "#555", marginTop: 5 },
  range: { fontSize: 14, color: "#777", marginTop: 5 },
  city: { fontSize: 16, fontWeight: "600", marginTop: 8, color: "green" },

  subtitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  probability: { fontSize: 26, fontWeight: "bold", color: "green" },
  info: { fontSize: 14, textAlign: "center", color: "#444", marginTop: 5 },

  alertTitle: { fontSize: 16, fontWeight: "bold", color: "red", marginBottom: 5 },
  alertBtn: {
    backgroundColor: "red",
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  alertBtnText: { color: "#fff", fontWeight: "bold" },
});
