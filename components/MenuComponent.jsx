import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutAndClearTicket } from "../redux/modules/authLogin/authThunks";
import Ionicons from "react-native-vector-icons/Ionicons";
import FormAddSite from "./sites/FormAddSite";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const DropdownMenu = () => {
  const ticket = useSelector((state) => state.auth.ticket);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuAccionVisible, setIsMenuAccionVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-50));

  useEffect(() => {
    if (isMenuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 5900,
        useNativeDriver: false,
      }).start();
    }
  }, [isMenuVisible]);

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
    setIsFormVisible(false);
  };

  return (
    <View style={styles.menuContainer}>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleDropdown}>
          <Ionicons name="md-menu" size={45} color="#03484c" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <SimpleLineIcons name="options-vertical" size={30} color="#03484c" />
        </TouchableOpacity>
      </View>

      {/* MODAL DEL MENU  */}
      <Modal
        animationType="none"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.dropdownContent,
                {
                  left: slideAnim, // Aplica la animación a la propiedad left
                },
              ]}
            >
              <View style={styles.containerHeader}>
                <FontAwesome name="user-circle-o" size={50} color="white" />

                <Text style={styles.titleHeader}>{user}</Text>
              </View>

              <View style={styles.bodyMenu}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => navigate.navigate("Profile")}
                >
                  <Ionicons name="md-person" size={25} color="white" />
                  <Text style={styles.text}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => navigate.navigate("Profile")}
                >
                  <Ionicons name="notifications" size={25} color="white" />
                  <Text style={styles.text}>Notificaciones</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => navigate.navigate("Profile")}
                >
                  <MaterialIcons
                    name="workspaces-filled"
                    size={25}
                    color="white"
                  />
                  <Text style={styles.text}>Gestionat sitios</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => navigate.navigate("People")}
                >
                  <FontAwesome5 name="users-cog" size={25} color="white" />

                  <Text style={styles.text}>Gestionar usuarios</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.footerContainer}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => dispatch(logoutAndClearTicket({ ticket }))}
                >
                  <Ionicons name="md-exit" size={25} color="white" />
                  <Text style={styles.text}>Cerrar sesión</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* MODAL DE ACCIONES DE LA SCREEN SITIOS  */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMenuAccionVisible}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlayAction}>
            <View style={styles.dropdownContentAction}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsFormVisible(true)}
              >
                <Ionicons name="md-add" size={40} color="#03484c" />
                <Text style={styles.textAction}>Crear sitio nuevo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={isFormVisible} animationType="slide">
        <FormAddSite onSubmit={handleSubmit} />
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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalOverlayAction: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bodyMenu: {
    display: "flex",
    height: "70%",
    justifyContent: "center",
  },
  dropdownContent: {
    display: "flex",
    backgroundColor: "#03484c",
    width: "80%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 1,
    paddingBottom: 10,
    position: "absolute", // Asegura que la animación funcione correctamente
  },
  dropdownContentAction: {
    display: "flex",
    backgroundColor: "white",
    width: 200,
    height: 100,
    elevation: 1,
    top: 0,
    right: 0,
    margin: 35,
    marginTop: 35,
    position: "absolute", // Asegura que la animación funcione correctamente
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
    marginBottom: 10,
    alignItems: 'center'
  },
  iconButton: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    margin: 15,
    paddingVertical: 10,
  },
  text: {
    marginLeft: 10,
    color: "white",
    fontWeight: "normal",
    fontSize: 15,
  },
  textAction: {
    color: "black",
    fontWeight: "normal",
    fontSize: 15,
  },
  containerHeader: {
    width: "auto",
    height: 120,
    borderBottomColor: "#50514f",
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  titleHeader: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 10,
    fontSize: 25,
  },
  footerContainer: {
    width: "auto",
    borderTopColor: "#50514f",
    borderTopWidth: 1,
    flexDirection: "row",
    padding: 10,
    bottom: 0,
  },
});

export default DropdownMenu;
