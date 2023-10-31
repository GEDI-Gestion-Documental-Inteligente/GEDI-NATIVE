import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PeopleMenuActions } from "./PeopleMenuActions";


export const PeopleItem = ({ people }) => {
  let state = null;

  if(people.entry.enabled){
     state = 'Activo'
  }else{
     state = 'Inactivo'
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>
          {people.entry.firstName} {people.entry.lastName}
        </Text>
        <Text style={styles.description}>{people.entry.id}</Text>
        <Text style={styles.description}>Estado: {state} </Text>
      </View>
      <PeopleMenuActions user={people.entry}/>
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
