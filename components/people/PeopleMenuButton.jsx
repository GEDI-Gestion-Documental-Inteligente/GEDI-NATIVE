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
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
});
