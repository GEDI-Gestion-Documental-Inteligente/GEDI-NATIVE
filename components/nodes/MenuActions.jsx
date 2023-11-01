import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SearchNodes } from "./SearchNodes";
import { FormAddNode } from "./FormAddNode";

export const MenuActions = ({ children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);


  const toggleDropdown = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const closeDropdown = () => {
    setIsMenuVisible(false);
  };

  const handleClose = () => {
    setModalVisible(false)
  }

  return (
    <View style={styles.menuContainer}>
      <View style={styles.containerTab}>
        <SearchNodes />
        <View style={styles.menuButton}>
          <TouchableOpacity style={styles.menuItem} onPress={toggleDropdown}>
            <AntDesign name="addfolder" size={40} color="#03484c" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <AntDesign name="upload" size={40} color="#03484c" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContent}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setModalVisible(true)}
              >
                <Ionicons name="md-folder-open" size={40} color="#03484c" />
                <Text>Nueva carpeta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <FormAddNode handleClose={handleClose} children={children} closeDropdown={closeDropdown}/>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    height: "auto", // Altura del menú desplegable
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 1,
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
    marginBottom: 20,
    margin: 10,
  },
  containerTab: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems:"center",
    padding: 5
  },
});
