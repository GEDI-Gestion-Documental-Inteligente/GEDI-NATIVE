import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import FormAddSite from "./FormAddSite";

export const AddSiteButton = () => {
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
        animationType="none"
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
                <Ionicons name="md-add" size={40} color="black" />
                <Text style={styles.text}>Crear un sitio</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal transparent={true} visible={isFormVisible} animationType="slide">
        <FormAddSite onSubmit={handleSubmit} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  dropdownContentAction: {
    display: "flex",
    backgroundColor: "white",
    width: 200,
    height: 100,
    elevation: 1,
    top: 0,
    right: 0,
    margin: 25,
    marginTop: 35,
    position: "absolute",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
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
    color: "black",
    fontWeight: "normal",
    fontSize: 15,
  },
});
