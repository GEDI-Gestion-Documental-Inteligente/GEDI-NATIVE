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
import { FormUploadContent } from "./FormUploadContent";

export const MenuActions = ({ children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const closeDropdown = () => {
    setIsMenuVisible(false);
  };

  const handleModalOpen = (modalType) => {
    setSelectedModal(modalType);
    setIsMenuVisible(false); // Cierra el menú después de seleccionar una opción
  };

  const handleClose = () => {
    setSelectedModal(null); // Limpia el tipo de modal seleccionado para cerrarlo
  };
  return (
    <View style={styles.menuContainer}>
      <View style={styles.containerTab}>
        <SearchNodes />
        <View style={styles.menuButton}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="md-add" size={45} color="#03484c" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isMenuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContent}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleModalOpen("folder")}
              >
                <Ionicons name="md-folder-open" size={30} color="#03484c" />
                <Text>Nueva carpeta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleModalOpen("upload")}
              >
                <Ionicons name="cloud-upload" size={30} color="#03484c" />
                <Text>Subir Archivo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Renderizado condicional del modal */}
      {selectedModal === "folder" && (
        <Modal
          visible={selectedModal === "folder"}
          animationType="slide"
          transparent={true}
        >
          <FormAddNode
            handleClose={handleClose}
            children={children}
            closeDropdown={closeDropdown}
          />
        </Modal>
      )}

      {selectedModal === "upload" && (
        <Modal
          visible={selectedModal === "upload"}
          animationType="slide"
          transparent={true}
        >
          <FormUploadContent
            handleClose={handleClose}
            children={children}
            closeDropdown={closeDropdown}
          />
        </Modal>
      )}
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
    alignItems: "center",
    padding: 5,
  },
});
