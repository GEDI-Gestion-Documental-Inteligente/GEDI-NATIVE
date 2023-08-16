import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import FolderItem from "../components/FolderItem";
 // Importa tu componente personalizado

const data = [
  { id: "1", name: "Carpeta 1", description: "Descripción de la carpeta 1" },
  { id: "2", name: "Carpeta 2", description: "Descripción de la carpeta 2" },
  // ... Más datos
];

const FolderScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FolderItem name={item.name} description={item.description} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
});

export default FolderScreen;
