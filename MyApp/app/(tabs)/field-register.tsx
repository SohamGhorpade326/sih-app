import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";

export default function FieldRegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Field Registration</Text>

      <Text style={styles.label}>Field Name</Text>
      <TextInput style={styles.input} placeholder="e.g. North Field 1" />

      <Text style={styles.label}>Crop Type</Text>
      <TextInput style={styles.input} placeholder="Wheat" />

      <Text style={styles.label}>GPS Field Mapping</Text>
      <Image
        source={require("../../assets/gps.png")}
        style={styles.banner}
      />
      <TouchableOpacity style={styles.gpsButton}>
        <Text style={styles.gpsText}>Detect Current Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save Field</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  banner: { width: "100%", height: 150, borderRadius: 10, marginTop: 10 },
  gpsButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "green",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  gpsText: { color: "green", fontWeight: "600" },
  saveButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: { color: "#fff", fontWeight: "bold" },
});
