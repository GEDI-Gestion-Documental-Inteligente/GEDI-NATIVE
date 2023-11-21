import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import FolderItem from "../components/nodes/FolderItem";
import { useDispatch, useSelector } from "react-redux";
import { getNodes } from "../redux/modules/nodes/NodeThunks";
import { getContainerDocumentLibrary } from "../redux/modules/sites/SitesThunks";
import { MenuActions } from "../components/nodes/MenuActions";

export const NodeChildScreen = ({ route }) => {
  const { id, siteName } = route.params;
  const ticket = useSelector((state) => state.auth.ticket);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nodesChildren = useSelector((state) => state.nodes.nodes);
  const resultSearch = useSelector((state) => state.nodes.searchNodes);

  useEffect(() => {
    const fetchData = async () => {
      let idContainer = "";
      try {
        if (siteName) {
          idContainer = await dispatch(getContainerDocumentLibrary({ticket, siteName}));
        }
        if (idContainer.payload != null) {
          await dispatch(getNodes({ id: idContainer.payload, ticket }));
        } else {
          await dispatch(getNodes({ id, ticket }));
          console.log(id);
        }
      } catch (error) {
        // Maneja errores si es necesario
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData(); // Llama a la función asincrónica
  }, [id, ticket]);

  const handleNodePress = (node) => {
    if (node.entry.nodeType === "cm:content") {
      navigation.navigate("NodeContent", {
        ticket,
        id: node.entry.id,
      });

      console.log("Se ha seleccionado un archivo:", node.entry.name);
    } else if (node.entry.nodeType === "cm:folder") {
      // Navegación hacia la misma pantalla con una nueva carpeta
      navigation.push("Nodes", {
        ticket,
        id: node.entry.id,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <MenuActions children={id}/>
      </View>

      {nodesChildren.length || (resultSearch && resultSearch.length) ? (
        <FlatList
          style={styles.list}
          data={
            resultSearch && resultSearch.length ? resultSearch : nodesChildren
          }
          renderItem={({ item }) => (
            <FolderItem
              name={item.entry.name}
              type={item.entry.nodeType}
              description={item.entry.id}
              onPress={() => handleNodePress(item)}
            />
          )}
          keyExtractor={(item) => item.entry.id}
        />
      ) : (
        <Text>No hay carpetas hijas o nodos hijos.</Text>
      )}

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "auto",
    backgroundColor: "#E6E7E6",
  },
  list: {
    width: "100%",
    display: "flex",
  },
});
