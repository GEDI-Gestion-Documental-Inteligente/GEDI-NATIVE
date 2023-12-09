import { useContext } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import nodeContext from "../../context/nodes/nodeContext";
import { Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { deleteNode } from "../../redux/modules/nodes/NodeThunks";

export const ModalDeleteNode = ({ handleModal }) => {
  const { node } = useContext(nodeContext);
  const dispatch = useDispatch();
  console.log(node);

  const confirmDeleteNode = async () => {
    await dispatch(deleteNode({ id: node.id }));
    handleModal()
  };
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton} onPress={handleModal}>
          <Text>cerrar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {node.nodeType === "cm:content"
            ? "Eliminar archivo"
            : "Eliminar Carpeta"}
        </Text>
        <View style={styles.info}>
          <Text>¿Está seguro que desea eliminarlo?</Text>
        </View>
        <View style={styles.footerButtons}>
          <Pressable style={styles.button}>
            <Text>Cancelar</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={confirmDeleteNode}>
            <Text>Confirmar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    width: "90%",
    paddingVertical: 30,
  },
  input: {
    height: 40,
    width: "auto",
    borderBottomColor: "#03484c",
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    color: "#03484c",
  },
  subTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "normal",
    backgroundColor: "#ccc",
    width: "auto",
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    color: "black",
  },

  buttonCancel: {
    backgroundColor: "#C7CBC7",
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  iconButton: {
    position: "absolute",
    right: 0,
    margin: 10,
  },
  info: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#03484c",
    top: 20,
    paddingVertical: 10,
    marginBottom: 30,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  button: {
    borderRadius: 5,
  },
});
