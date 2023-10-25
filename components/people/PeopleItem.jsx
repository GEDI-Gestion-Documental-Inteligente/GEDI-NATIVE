import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PeopleMenuActions } from "./PeopleMenuActions";


export const PeopleItem = ({ people }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>
          {people.entry.firstName} {people.entry.lastName}
        </Text>
        <Text style={styles.description}>{people.entry.id}</Text>
        <Text style={styles.description}>{people.entry.jobTitle}</Text>
      </View>
      <PeopleMenuActions user={people}/>
    </View>
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
