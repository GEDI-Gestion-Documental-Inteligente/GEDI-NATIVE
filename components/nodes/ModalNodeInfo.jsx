import { useContext } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import nodeContext from "../../context/nodes/nodeContext";

export const ModalNodeInfo = ({ handleModal }) => {
  const { item } = useContext(nodeContext);
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleModal}
        ></TouchableOpacity>
        <Text style={styles.title}>Acerca de: </Text>
        <View>{item.title}</View>
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
  button: {
    backgroundColor: "#03484c",
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 5,
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
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
  containerProfile: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
});
