import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Choose Your Mode</Text>

      {/* Normal Mode */}
      <View style={styles.card}>
        <Image
          source={require("../../assets/green-field.jpg")}
          style={styles.banner}
        />
        <View style={styles.cardContent}>
          <View style={styles.row}>
            <Ionicons name="leaf-outline" size={22} color="#F4A300" />
            <Text style={styles.cardTitle}>Normal Mode</Text>
          </View>
          <Text style={styles.cardDesc}>
            Receive personalized guidance through a series of easy-to-answer questions about your farm.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(tabs)/field-register")}
          >
            <Text style={styles.buttonText}>Start Guided Questions</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Advanced Mode */}
      <View style={styles.card}>
        <Image
          source={require("../../assets/scientist.jpg")}
          style={styles.banner}
        />
        <View style={styles.cardContent}>
          <View style={styles.row}>
            <Ionicons name="flask-outline" size={22} color="#F4A300" />
            <Text style={styles.cardTitle}>Advanced Mode</Text>
          </View>
          <Text style={styles.cardDesc}>
            Upload your soil test photos for in-depth AI analysis and comprehensive recommendations.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/(tabs)/field-register")}
          >
            <Text style={styles.buttonText}>Upload Soil Test Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: "hidden",
  },
  banner: { width: "100%", height: 130 },
  cardContent: { padding: 15 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginLeft: 6, color: "#000" },
  cardDesc: { fontSize: 14, color: "#555", marginBottom: 10 },
  button: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
