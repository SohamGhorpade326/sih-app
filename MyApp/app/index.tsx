import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")} // replace with your bg image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.logo}>✦</Text>
        <Text style={styles.title}>KrishiSeva.ai</Text>
        <Text style={styles.subtitle}>Cultivating{"\n"}Tomorrow's Harvest</Text>
        <Text style={styles.desc}>
          AI-powered insights for a greener,{"\n"}more prosperous future in farming.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login" as any)}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  logo: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginVertical: 10,
  },
  desc: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
