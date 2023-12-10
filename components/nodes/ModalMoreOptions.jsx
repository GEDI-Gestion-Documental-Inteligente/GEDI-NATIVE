import { useContext, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import nodeContext from "../../context/nodes/nodeContext";
import { FormUpdateNode } from "./FormUpdateNode";
import { FormUpdatePermissions } from "./FormUpdatePermissionsNode";

export const ModalMoreOptions = ({ handleModal }) => {
  const [isModalUpdateNodeVisible, setIsModalUpdateNodeVisible] =
    useState(false);
  const [isModalUpdatePermissions, setIsModalUpdatePermissions] =
    useState(false);
  const toggleMenu = () => {
    setIsModalUpdateNodeVisible(false);
    setIsModalUpdatePermissions(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.container}>
            <View style={styles.option}>
              <Pressable
                onPress={() => {
                  setIsModalUpdateNodeVisible(true);
                  
                }}
              >
                <Text>Editar</Text>
              </Pressable>
            </View>
            <View style={styles.option}>
              <Pressable
                onPress={() => {
                  setIsModalUpdatePermissions(true);
    
                }}
              >
                <Text>Restringir acceso</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Modal
        visible={isModalUpdateNodeVisible}
        animationType="slide"
        transparent={true}
      >
        <FormUpdateNode handleModal={toggleMenu} />
      </Modal>
      <Modal
        visible={isModalUpdatePermissions}
        animationType="slide"
        transparent={true}
      >
        <FormUpdatePermissions handleModal={toggleMenu} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    borderBottomRightRadius: 0,
    width: 200,
    margin: 10,
    marginHorizontal: 30,
  },
  modalOverlay: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0)",
    alignItems: "flex-end",
    marginBottom: 65,
  },
  option: {
    marginVertical: 10,
  },
});
