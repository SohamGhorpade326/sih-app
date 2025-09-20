import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function LanguageScreen() {
  const router = useRouter();

  const handleSelectLanguage = (lang: string) => {
    // Just navigate to next page for now
    router.push("/(tabs)" as any);
  };

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={["#7AD63A", "#B7E25C"]}
        style={styles.header}
      >
        <Text style={styles.logo}>✦ KrishiSeva.ai</Text>
      </LinearGradient>

      {/* Heading */}
      <Text style={styles.heading}>Choose Your Language</Text>
      <Text style={styles.subHeading}>
        Select the language you are most comfortable with to get started.
      </Text>

      {/* Language Options */}
      <TouchableOpacity style={styles.card} onPress={() => handleSelectLanguage("English")}>
        <Image
          source={require("../assets/eng.png")}
          style={styles.leftIcon}
        />
        <Text style={styles.langText}>English</Text>
        <Image
          source={require("../assets/farmer.png")}
          style={styles.rightIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handleSelectLanguage("Hindi")}>
        <Image
          source={require("../assets/hindi.png")}
          style={styles.leftIcon}
        />
        <Text style={styles.langText}>मराठी</Text>
        <Image
          source={require("../assets/tea.png")}
          style={styles.rightIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => handleSelectLanguage("Marathi")}>
        <Image
          source={require("../assets/hindu.png")}
          style={styles.leftIcon}
        />
        <Text style={styles.langText}>ଓଡ଼ିଆ</Text>
        <Image
          source={require("../assets/sprout.png")}
          style={styles.rightIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  header: {
    width: "100%",
    height: 150,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  langText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  leftIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  rightIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
