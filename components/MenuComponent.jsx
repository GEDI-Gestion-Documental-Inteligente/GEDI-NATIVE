import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutAndClearTicket } from "../redux/modules/authLogin/authThunks";
import Ionicons from "react-native-vector-icons/Ionicons";
import FormAddSite from "./FormAddSite";

const DropdownMenu = () => {
  const ticket = useSelector((state) => state.auth.ticket);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuAccionVisible, setIsMenuAccionVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleDropdown = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const closeDropdown = () => {
    setIsMenuVisible(false);
  };

  const toggleMenu = () => {
    setIsMenuAccionVisible(!isMenuAccionVisible);
  };

  const closeMenu = () => {
    setIsMenuAccionVisible(false);
  };


  const handleSubmit = (siteData) => {
    setIsMenuAccionVisible(false);
    // Cierra el formulario después de enviar los datos
    setIsFormVisible(false);
  };


  return (
    <View style={styles.menuContainer}>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleDropdown}>
          <Ionicons name="md-menu" size={45} color="#03484c" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Ionicons name="md-add" size={45} color="#03484c" />
        </TouchableOpacity>
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
                onPress={() => navigate.navigate("Profile")}
              >
                <Ionicons name="md-person" size={30} color="white" />
                <Text style={styles.text}>Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => dispatch(logoutAndClearTicket({ ticket }))}
              >
                <Ionicons name="md-exit" size={30} color="white" />
                <Text style={styles.text}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuAccionVisible}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContent}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsFormVisible(true)}
              >
                <Ionicons name="md-add" size={55} color="black" />
                <Text style={styles.text}>Crear sitio nuevo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={isFormVisible} animationType="slide">
        <FormAddSite onSubmit={handleSubmit}/>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    borderRadius: 5,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
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
    backgroundColor: "#03484c",
    width: "100%",
    height: "auto", // Altura del menú desplegable
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 1,
    
  },
  menuContainer: {
    display: "flex",
    height: "5vh",
    justifyContent: "center",
  },
  containerButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
    marginBottom: 10
  },
  iconButton: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    margin: 15
  },
  text:{
    marginLeft: 10,
    color: "white"
  }
});

export default DropdownMenu;
