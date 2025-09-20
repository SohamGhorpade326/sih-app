import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function SchemeDetails() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Scheme Details",
      headerBackTitle: "Back",
    });
  }, [navigation]);

  const schemes: Record<string, { title: string; desc: string; img: any }> = {
    "1": {
      title: "KALIA Scheme",
      desc: `The Krushak Assistance for Livelihood and Income Augmentation (KALIA) 
scheme provides direct financial support to small and marginal farmers in Odisha. 
It covers crop cultivation, livelihood support for landless households, and insurance. 
The scheme aims to reduce debt burdens, increase agricultural sustainability, 
and ensure inclusive growth.`,
      img: require("../../../assets/sch-1.png"),
    },
    "2": {
      title: "Biju Krushak Kalyan Yojana (BKKY)",
      desc: `Biju Krushak Kalyan Yojana (BKKY) is a health insurance scheme for farmers 
and their families in Odisha. It provides coverage for hospitalization expenses, 
including treatment of both major and minor ailments. The scheme is designed to 
reduce the financial burden of medical costs for rural and agricultural households.`,
      img: require("../../../assets/sch-2.png"),
    },
  };

  const scheme = schemes[id as string];

  if (!scheme) {
    return (
      <View style={styles.container}>
        <Text>Scheme not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={scheme.img} style={styles.image} />
      <Text style={styles.title}>{scheme.title}</Text>
      <Text style={styles.desc}>{scheme.desc}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#ddd",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, color: "#333" },
  desc: { fontSize: 16, lineHeight: 22, color: "#444" },
});
