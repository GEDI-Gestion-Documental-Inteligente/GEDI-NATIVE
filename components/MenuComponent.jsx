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
import { logoutAndClearTicket } from "../redux/services/authThunks";

const DropdownMenu = () => {
  const ticket = useSelector(state => state.auth.ticket)
  const navigate = useNavigation();
  const dispatch= useDispatch();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleDropdown}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContent}>
              <TouchableOpacity
                style={styles.textButton}
                onPress={() => console.log("Option 1 selected")}
              >
                <Text>Gestionar usuarios</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textButton}
                onPress={() => navigate.navigate("Sites")}
              >
                <Text>Gestionar sitios</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textButton}
                onPress={() => console.log("Option 3 selected")}
              >
                <Text>Gestionar grupos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textButton}
                onPress={() => navigate.navigate("Activities")}
              >
                <Text>Actividad</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textButton}
                onPress={() => dispatch(logoutAndClearTicket({ticket}))}
              >
                <Text>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: "lightgray",
    borderRadius: 5,
    padding: 10,
  },
  menuButtonText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Alinea el contenido hacia abajo
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownContent: {
    display: "flex",
    justifyContent: "flex-end",
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
});

export default DropdownMenu;
