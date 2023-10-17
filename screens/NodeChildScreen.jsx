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
import FolderItem from "../components/FolderItem";
import { useDispatch, useSelector } from "react-redux";
import { getNodes } from "../redux/modules/nodes/NodeThunks";
import { getContainerDocumentLibrary } from "../redux/modules/sites/SitesThunks";
import { MenuActions } from "../components/MenuActions";

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
        }
      } catch (error) {
        // Maneja errores si es necesario
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData(); // Llama a la función asincrónica
  }, []);

  // const createNode = async () => {
  //   const myheaders = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Basic " + ticket,
  //     },
  //   };
  //   const body = {
  //     name: nodeName,
  //     nodeType: selectedNodeType,
  //   };

  //   try {
  //     const response = await axios.post(
  //       `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/children`,
  //       body,
  //       myheaders
  //     );
  //     if (response.status === 201) {
  //       // Node created successfully, update the list of child nodes
  //       fetchData();
  //       setModalVisible(false);
  //     } else {
  //       console.error("Error creating node");
  //     }
  //   } catch (error) {
  //     console.error("Error creating node:", error);
  //   }
  // };

  const handleNodePress = (node) => {
    if (node.entry.nodeType === "cm:content") {
      navigation.navigate("NodeContent", {
        ticket,
        id: node.entry.id,
      });

      console.log("Se ha seleccionado un archivo:", node.entry.name);
    } else if (node.entry.nodeType === "cm:folder") {
      navigation.navigate("Nodes", {
        ticket,
        id: node.entry.id,
      });
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
