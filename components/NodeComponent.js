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
import axios from "axios"; // Importa axios
import { IPV4_ADDRESS } from "../screens/SiteScreen";
import FolderItem from "./FolderItem";

export const NodeComponent = ({ route }) => {
  const { id, ticket } = route.params;
  const [childNodes, setChildNodes] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [nodeName, setNodeName] = useState("");
  const [columns, setColumns] = useState(2);
  const [selectedNodeType, setSelectedNodeType] = useState("cm:content");
  const navigation = useNavigation();

  const fetchChildNodes = async (id, ticket) => {
    const myheaders = {
      headers: {
        Authorization: "Basic " + ticket,
      },
    };

    try {
      const response = await axios.get(
        `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/children`,
        myheaders
      );
      console.log(response.data.list.entries)
      return response.data.list.entries;
    } catch (error) {
      console.error("Error fetching child nodes:", error);
      return [];
    }
  };

  const fetchData = async () => {
    const nodes = await fetchChildNodes(id, ticket);
    setChildNodes(nodes);
  };

  useEffect(() => {
    fetchData();
  }, [id, ticket]);

  const createNode = async () => {
    const myheaders = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + ticket,
      },
    };
    const body = {
      name: nodeName,
      nodeType: selectedNodeType,
    };

    try {
      const response = await axios.post(
        `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/children`,
        body,
        myheaders
      );
      if (response.status === 201) {
        // Node created successfully, update the list of child nodes
        fetchData();
        setModalVisible(false);
      } else {
        console.error("Error creating node");
      }
    } catch (error) {
      console.error("Error creating node:", error);
    }
  };

  const handleNodePress = (node) => {
    if (node.entry.nodeType === "cm:content") {
      navigation.navigate("NodeContent", {
        ticket,
        id: node.entry.id,
      });

      console.log("Se ha seleccionado un archivo:", node.entry.name);
    } else if (node.entry.nodeType === "cm:folder") {
      navigation.navigate("NodeComponent", {
        ticket,
        id: node.entry.id,
      });
    }
  };

  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>CARGAR</Text>
      </Pressable>

      <View style={styles.container}>
        {childNodes.length > 0 ? (
          <FlatList
        
            data={childNodes}
            numColumns={2}
            renderItem={({ item }) => (
              <FolderItem
                name={item.entry.name}
                description={item.entry.id} // Asegúrate de que la estructura de tu data tenga 'entry.description'
                onPress={() => handleNodePress(item)}
              />
            )}
            keyExtractor={(item) => item.entry.id}
          />
        ) : (
          <Text>No hay carpetas hijas.</Text>
        )}
      </View>

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
          <Button title="Crear" onPress={createNode} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: "100%",
    padding: 30,
    backgroundColor: "#4D6F5F",
    flexDirection: "row",
  },
});
