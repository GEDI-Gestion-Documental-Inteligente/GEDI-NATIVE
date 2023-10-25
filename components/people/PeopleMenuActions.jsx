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
import { SimpleLineIcons } from "@expo/vector-icons";
import { FormStatus } from "./FormStatus";
import { FontAwesome5 } from '@expo/vector-icons';

export const PeopleMenuActions = ({ user }) => {
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
        <View style={styles.containerOptions}>
          <SimpleLineIcons name="options-vertical" size={25} color="#03484c" />
        </View>
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
                <FontAwesome5 name="user-cog" size={25} color="black" />
                <Text style={styles.text}>Deshabilitar usuario</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsFormVisible(true)}
              >
               <FontAwesome5 name="user-edit" size={25} color="black" />
                <Text style={styles.text}>Editar usuario</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal transparent={true} visible={isFormVisible} animationType="slide">
        <FormStatus user={user} onSubmit={handleSubmit} />
      </Modal>

      {/* <Modal transparent={true} visible={isFormVisible} animationType="slide">
        <FormStatus user={user} onSubmit={handleSubmit} />
      </Modal> */}
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
