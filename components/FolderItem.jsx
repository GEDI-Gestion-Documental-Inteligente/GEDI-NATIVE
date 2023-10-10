import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const FolderItem = ({ name, type, description, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Icon
            name={type == "cm:folder" ? "folder-outline" : "document-outline"}
            size={50}
            color="#03484c"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", // Para alinear los elementos en fila
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    padding: 10,
    width: "95%",
    height: 80,
    marginBottom: 4,
    marginHorizontal: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    color: "#03484c",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "#03484c",
  },
});

export default FolderItem;
