import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Modal } from "react-native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import nodeContext from "../../context/nodes/nodeContext";
import { ModalNodeInfo } from "./ModalNodeInfo";
import { SearchMoveNode } from "./SearchMoveNode";

const FolderItem = ({ node, onPress }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDetailsVisible, setisDetailsVisible] = useState(false)
  const [isModalMoveVisible, setisModalMoveVisible] = useState(false)
  const [selectedModal, setSelectedModal] = useState(null);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
    setisDetailsVisible(false)
    setisModalMoveVisible(false)
  };

  const closeDropdown = () => {
    setIsMenuVisible(false);
  };

  console.log("node", node.nodeType);

  return (
    <nodeContext.Provider value={{ node }}>
      <View>
        <Pressable onPress={onPress} onLongPress={toggleMenu}>
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Icon
                name={
                  node.nodeType == "cm:folder"
                    ? "folder-outline"
                    : "document-outline"
                }
                size={50}
                color="#03484c"
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{node.name}</Text>
              <Text style={styles.description}>{node.properties['cm:description']}</Text>
            </View>
          </View>
        </Pressable>

        <Modal
          visible={isMenuVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeDropdown}
        >
          <TouchableWithoutFeedback onPress={closeDropdown}>
            <View style={styles.modalOverlay}>
              <View style={styles.dropdownContent}>
                <TouchableOpacity style={styles.iconButton} onPress={()=> {setisDetailsVisible(true)}}>
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color="black"
                  />
                  <Text>Detalles</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={()=> {setisModalMoveVisible(true)}}>
                  {node.nodeType === "cm:content" ? (
                    <MaterialCommunityIcons
                      name="file-move-outline"
                      size={24}
                      color="black"
                    />
                  ) : (
                    <MaterialIcons
                      name="drive-file-move-outline"
                      size={24}
                      color="black"
                    />
                  )}

                  <Text>Mover</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color="black"
                  />
                  <Text>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          visible={isDetailsVisible}
          animationType="slide"
          transparent={true}
        >
         <ModalNodeInfo handleModal={toggleMenu}/>
        </Modal>

        <Modal
          visible={isModalMoveVisible}
          animationType="slide"
          transparent={true}
        >
         <SearchMoveNode handleModal={toggleMenu}/>
        </Modal>
      </View>
    </nodeContext.Provider>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", // Para alinear los elementos en fila
    backgroundColor: "rgba(255, 255, 255, 0.5)",
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
  menuButton: {
    borderRadius: 5,
    display: "flex",
    flexDirection: "row-reverse",
  },
  menuItem: {
    marginHorizontal: 5,
  },
  menuButtonMas: {
    fontSize: 25,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Alinea el contenido hacia abajo
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  dropdownContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0)",
    width: "100%",
    height: "auto", // Altura del menú desplegable
    bottom: 50,
    borderTopWidth: 1,
    borderTopColor: "#cccc",
  },
  textButton: {
    padding: 25,
    borderWidth: 0.5,
    borderRadius: 1,
  },
  menuContainer: {
    display: "flex",
    height: "5vh",
  },
  iconButton: {
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 30,
  },
  containerTab: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    padding: 5,
  },
});

export default FolderItem;
