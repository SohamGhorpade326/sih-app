import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export default function DiseaseScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  // Pick image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setPrediction(null);
    }
  };

  // Upload image & get prediction
  const handlePredict = async () => {
    if (!imageUri) {
      Alert.alert("No Image", "Please select an image first.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "crop.jpg",
        type: "image/jpeg",
      } as any);

      // TODO: replace with your backend IP
      const res = await fetch(`${backendUrl}/predict`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to get prediction.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crop Disease Prediction</Text>

      {/* Image Preview */}
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={{ color: "#999" }}>No Image Selected</Text>
        </View>
      )}

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={handlePredict}
      >
        <Text style={styles.buttonText}>Predict</Text>
      </TouchableOpacity>

      {/* Loading / Result */}
      {loading && <ActivityIndicator size="large" color="green" />}
      {prediction && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            Disease: {prediction.disease || "Unknown"}
          </Text>
          <Text style={styles.resultText}>
            Confidence: {(prediction.confidence * 100).toFixed(2)}%
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  image: { width: "100%", height: 250, borderRadius: 10, marginBottom: 15 },
  placeholder: {
    width: "100%",
    height: 250,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  resultBox: {
    marginTop: 20,
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
  },
  resultText: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
});
