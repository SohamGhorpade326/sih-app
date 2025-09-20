import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

type Crop = {
  id: number;
  name: string;
  price: number;
  change: number;
  demand: string;
};
const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
export default function MarketScreen() {
  const [activeTab, setActiveTab] = useState<"prices" | "schemes">("prices");
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [demandFilter, setDemandFilter] = useState("All");
  const router = useRouter();

  useEffect(() => {
    if (activeTab === "prices") {
      fetchCrops();
      const interval = setInterval(fetchCrops, 10000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const fetchCrops = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/crops`); // 👈 Replace with your IP
      const data: Crop[] = await res.json();
      setCrops(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (search.trim() === "") {
        await fetchCrops();
        return;
      }
      const res = await fetch(
        `${backendUrl}/api/crops/search?q=${search}`
      );
      const data: Crop[] = await res.json();
      setCrops(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleFilter = async (value: string) => {
    setDemandFilter(value);
    setLoading(true);
    try {
      if (value === "All") {
        await fetchCrops();
      } else {
        const res = await fetch(
          `${backendUrl}/api/crops/filter?demand=${value}`
        );
        const data: Crop[] = await res.json();
        setCrops(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const renderCrop: ListRenderItem<Crop> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <Text
        style={[
          styles.change,
          { color: item.change >= 0 ? "green" : "red" },
        ]}
      >
        {item.change >= 0 ? "▲" : "▼"} {item.change}%
      </Text>
      <Text style={styles.demand}>{item.demand} Demand</Text>
    </View>
  );

  const renderSchemes = () => (
    <ScrollView style={{ flex: 1 }}>
      {/* Scheme 1 */}
      <TouchableOpacity
        style={styles.schemeCard}
        onPress={() => router.push("/(tabs)/scheme-details/1" as any)}
      >
        <Image
          source={require("../../assets/sch-1.png")}
          style={styles.schemeImage}
        />
        <View style={styles.schemeText}>
          <Text style={styles.schemeTitle}>KALIA Scheme</Text>
          <Text style={styles.schemeDesc} numberOfLines={3}>
            Provides financial support to small and marginal farmers in Odisha. 
            Assistance includes crop cultivation, livelihood support, and insurance. 
            Aims to reduce debt burden and promote sustainable agriculture.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Scheme 2 */}
      <TouchableOpacity
        style={styles.schemeCard}
        onPress={() => router.push("/(tabs)/scheme-details/2" as any)}
      >
        <Image
          source={require("../../assets/sch-2.png")}
          style={styles.schemeImage}
        />
        <View style={styles.schemeText}>
          <Text style={styles.schemeTitle}>Biju Krushak Kalyan Yojana (BKKY)</Text>
          <Text style={styles.schemeDesc} numberOfLines={3}>
            A health insurance scheme for farmers and their families in Odisha. 
            Covers hospitalization expenses and ensures better healthcare access. 
            Helps reduce financial burden from medical treatment in rural communities.
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Tab Switch */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === "prices" && styles.activeTab]}
          onPress={() => setActiveTab("prices")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "prices" && styles.activeTabText,
            ]}
          >
            Market Prices
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === "schemes" && styles.activeTab]}
          onPress={() => setActiveTab("schemes")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "schemes" && styles.activeTabText,
            ]}
          >
            Government Schemes
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "prices" ? (
        <>
          {/* Search Bar */}
          <View style={styles.searchRow}>
            <TextInput
              style={styles.input}
              placeholder="Search crops..."
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
              <Ionicons name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Filter Dropdown */}
          <View style={styles.filterRow}>
            <Text style={{ marginRight: 10, fontWeight: "600" }}>
              Filter by Demand:
            </Text>
            <Picker
              selectedValue={demandFilter}
              style={{ flex: 1, height: 40 }}
              onValueChange={(value) => handleFilter(value)}
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="High" value="High" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="Low" value="Low" />
            </Picker>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <FlatList<Crop>
              data={crops}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderCrop}
            />
          )}
        </>
      ) : (
        renderSchemes()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },

  tabRow: { flexDirection: "row", marginBottom: 15 },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: { borderBottomColor: "green" },
  tabText: { fontSize: 16, fontWeight: "500", color: "#555" },
  activeTabText: { color: "green", fontWeight: "bold" },

  searchRow: { flexDirection: "row", marginBottom: 10 },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
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
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: "bold" },
  price: { fontSize: 18, fontWeight: "bold", color: "#333" },
  change: { fontSize: 14, marginTop: 4 },
  demand: { fontSize: 14, marginTop: 2, color: "#666" },

  schemeCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  schemeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#ddd",
    marginRight: 12,
  },
  schemeText: { flex: 1 },
  schemeTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  schemeDesc: { fontSize: 14, color: "#444" },
});
