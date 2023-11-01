import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const SiteListItem = ({ site }) => {
  const navigation = useNavigation();

  const siteData = site.entry.site ? site.entry.site : site.entry;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("InformationSite",  {siteData} );
      }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>{siteData.title}</Text>
          <Text style={styles.description}>{siteData.visibility}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "grey",
  },
});
