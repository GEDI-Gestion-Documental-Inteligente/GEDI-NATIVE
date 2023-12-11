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
import { FontAwesome5 } from "@expo/vector-icons";
import { FormEditPeople } from "./FormEditPeople";
import { PeopleCard } from "./PeopleCard";

export const PeopleMenuActions = ({ user }) => {
  const [isMenuVisible, setisMenuVisible] = useState(false);
  const [isFormStatusVisible, setIsFormStatusVisible] = useState(false);
  const [isFormEditVisible, setIsFormEditVisible] = useState(false);
  const [isDetailsVisible, setDetailsVisible] = useState(false);

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

  const handleSubmit3 = () => {
    setisMenuVisible(false);
    setDetailsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleMenu}>
        <View style={styles.containerOptions}>
          <SimpleLineIcons name="options-vertical" size={25} color="#03484c" />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContentAction}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsFormEditVisible(true)}
              >
                <FontAwesome5 name="user-edit" size={20} color="black" />
                <Text style={styles.text}>Editar usuario</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsFormStatusVisible(true)}
              >
                <FontAwesome5 name="user-cog" size={20} color="black" />
                <Text style={styles.text}>Deshabilitar usuario</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  setDetailsVisible(true);
                }}
              >
                <FontAwesome5 name="info-circle" size={20} color="black" />
                <Text style={styles.text}>Ver detalles</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        transparent={true}
        visible={isFormStatusVisible}
        animationType="slide"
        onRequestClose={closeMenu}
      >
        <FormStatus user={user} onSubmit={handleSubmit} />
      </Modal>

      <Modal
        transparent={true}
        visible={isFormEditVisible}
        animationType="slide"
        onRequestClose={closeMenu}
      >
        <FormEditPeople user={user} onSubmit={handleSubmit2} />
      </Modal>

      <Modal
        transparent={true}
        visible={isDetailsVisible}
        animationType="slide"
        onRequestClose={closeMenu}
      >
        <PeopleCard user={user} onSubmit={handleSubmit3} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  dropdownContentAction: {
    backgroundColor: "white",
    width: "100%",
    height: "auto",
    elevation: 1,
    bottom: 0,
    position: "absolute",
    borderWidth: 1,
    borderColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  iconButton: {
    alignItems: "center",
    flexDirection: "column",
    padding: 15,
  },
  text: {
    marginLeft: 10,
    color: "black",
    fontWeight: "normal",
    fontSize: 10,
  },
});
