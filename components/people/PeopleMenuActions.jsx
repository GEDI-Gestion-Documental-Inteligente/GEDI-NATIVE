import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FormStatus } from "./FormStatus";
import { FontAwesome5 } from '@expo/vector-icons';
import { FormEditPeople } from "./FormEditPeople";

export const PeopleMenuActions = ({ user }) => {
  const [isMenuVisible, setisMenuVisible] = useState(false);
  const [isFormStatusVisible, setIsFormStatusVisible] = useState(false);
  const [isFormEditVisible, setIsFormEditVisible] = useState(false);
  const toggleMenu = () => {
    setisMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setisMenuVisible(false);
  };

  const handleSubmit = () => {
    setisMenuVisible(false);
    setIsFormStatusVisible(false);
  };

  const handleSubmit2 = () => {
    setisMenuVisible(false);
    setIsFormEditVisible(false);
  };
  return (
    <View>
      <TouchableOpacity onPress={toggleMenu}>
        <View style={styles.containerOptions}>
          <SimpleLineIcons name="options-vertical" size={25} color="#03484c" />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContentAction}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsFormStatusVisible(true)}
              >
                <FontAwesome5 name="user-cog" size={25} color="black" />
                <Text style={styles.text}>Deshabilitar usuario</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsFormEditVisible(true)}
              >
               <FontAwesome5 name="user-edit" size={25} color="black" />
                <Text style={styles.text}>Editar usuario</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal transparent={true} visible={isFormStatusVisible} animationType="slide">
        <FormStatus user={user} onSubmit={handleSubmit} />
      </Modal>

      <Modal transparent={true} visible={isFormEditVisible} animationType="slide">
        <FormEditPeople user={user} onSubmit={handleSubmit2} />
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
    width: 'auto',
    height: 'auto',
    elevation: 1,
    top: 0,
    right: 0,
    margin: 25,
    marginTop: 35,
    position: "absolute",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
  },
  iconButton: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15
  },
  text: {
    marginLeft: 10,
    color: "black",
    fontWeight: "normal",
    fontSize: 15,
  },
});
