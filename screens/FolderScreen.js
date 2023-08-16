import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import FolderItem from "../components/FolderItem";
 // Importa tu componente personalizado

const data = [
  { id: "1", name: "Sitio ", description: "Descripción de la Sitio " },
  { id: "2", name: "Sitio ", description: "Descripción de la Sitio " },
  { id: "3", name: "Sitio ", description: "Descripción de la Sitio " },
  { id: "4", name: "Sitio ", description: "Descripción del Sitio " },
  { id: "5", name: "Sitio ", description: "Descripción del Sitio " },
  { id: "6", name: "Sitio ", description: "Descripción del Sitio " },
  { id: "7", name: "Sitio ", description: "Descripción del Sitio " },
  { id: "8", name: "Sitio ", description: "Descripción del Sitio " },
  { id: "9", name: "Sitio ", description: "Descripción del sitio" },

  // ... Más datos
];

const FolderScreen = () => {
  const [numColumns, setNumColumns] = useState(3);
  return (
    <View style={styles.container}>
      <FlatList
      numColumns={numColumns}
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
    padding: 30,
    backgroundColor: "#4D6F5F",
    flexDirection: "row",

  },
});

export default FolderScreen;
