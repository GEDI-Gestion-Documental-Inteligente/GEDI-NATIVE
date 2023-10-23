import { Animated, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FormAddPeople } from "./FormAddPeople";
import { useState } from "react";

export const PeopleMenuButton = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuAccionVisible, setIsMenuAccionVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-50));
  const toggleMenu = () => {
    setIsMenuAccionVisible(!isMenuAccionVisible);
  };

  const closeMenu = () => {
    setIsMenuAccionVisible(false);
  };

  const handleSubmit = () => {
    setIsMenuAccionVisible(false);
    setIsFormVisible(false);
  };
  return (
    <View>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="md-add" size={45} color="#03484c" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuAccionVisible}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContentAction}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsFormVisible(true)}
              >
                <Ionicons name="md-add" size={55} color="black" />
                <Text style={styles.text}>Crear usuario</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={isFormVisible} animationType="slide">
        <FormAddPeople onSubmit={handleSubmit} />
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
    backgroundColor: "#03484c",
    width: "100%",
    height: "auto",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 1,
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
