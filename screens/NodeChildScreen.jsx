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

export const NodeChildScreen = ({ route }) => {
  const { id } = route.params;
  const ticket = useSelector(state => state.auth.ticket)
  const [isModalVisible, setModalVisible] = useState(false);
  const [nodeName, setNodeName] = useState("");
  const [selectedNodeType, setSelectedNodeType] = useState("cm:content");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const nodesChildren = useSelector(state => state.nodes.nodes)
  



  useEffect(()=>{
    dispatch(getNodes({id, ticket}))
  
  }, [id])
 
  useEffect(()=>{
    console.log(id)
  
  }, [id])

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
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>CARGAR</Text>
      </Pressable>

      <View style={styles.container}>
        {nodesChildren.length ? (
          <FlatList
        
            data={nodesChildren}
            numColumns={2}
            renderItem={({ item }) => (
              <FolderItem
                name={item.entry.name}
                type = {item.entry.nodeType}
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
          {/* <Button title="Crear" onPress={createNode} /> */}
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
