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
  const [isModalVisible, setModalVisible] = useState(false);
  const [nodeName, setNodeName] = useState("");
  const [selectedNodeType, setSelectedNodeType] = useState("cm:content");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nodesChildren = useSelector((state) => state.nodes.nodes);
  const resultSearch = useSelector((state) => state.nodes.searchNodes);
  const [nodeHistory, setNodeHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let idContainer = "";
      try {
        if (siteName) {
          idContainer = await dispatch(getContainerDocumentLibrary(siteName));
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
      setNodeHistory([...nodeHistory, node]);
    }
  };
  const handleGoBack = () => {
    // Obtiene el último nodo visitado desde el historial
    const lastVisitedNode = nodeHistory.pop();

    if (lastVisitedNode) {
      // Navega al último nodo visitado
      navigation.navigate("Nodes", {
        ticket,
        id: lastVisitedNode.entry.id,
      });

      // Actualiza el historial de nodos visitados
      setNodeHistory([...nodeHistory]);
    } else {
      // Si no hay nodos en el historial, simplemente navega hacia atrás
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <MenuActions />
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

      <Modal visible={isModalVisible} animationType="slide">
        <View>
          <Text>Crear Nuevo Nodo</Text>
          <TextInput
            placeholder="Nombre del nodo"
            value={nodeName}
            onChangeText={(text) => setNodeName(text)}
          />
          <Picker
            selectedValue={selectedNodeType}
            onValueChange={(itemValue) => setSelectedNodeType(itemValue)}
          >
            <Picker.Item label="Archivo" value="cm:content" />
            <Picker.Item label="Carpeta" value="cm:folder" />
            {/* Add more types as needed */}
          </Picker>
          {/* <Button title="Crear" onPress={createNode} /> */}
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      {/* <Button title="Atrás" onPress={handleGoBack} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "auto",
    backgroundColor: "#D7DFD7",
  },
  list: {
    width: "100%",
    display: "flex",
  },
});
