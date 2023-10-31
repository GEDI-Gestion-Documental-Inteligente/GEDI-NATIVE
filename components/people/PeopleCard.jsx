import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export const PeopleCard = ({ user, onSubmit }) => {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton} onPress={onSubmit}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Acerca de: </Text>
        <View>
          <View style={styles.containerProfile}>
            <FontAwesome name="user" size={80} color="#03484c" />
            <Text style={styles.text}>{user.firstName} {user.lastName}</Text>
          </View>

          <Text style={styles.subTitle}>Correo electrónico</Text>
          <Text style={styles.text}>{user.email}</Text>
          <Text style={styles.subTitle}>Trabajo</Text>
          <Text style={styles.text}>{user.jobTitle}</Text>
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
    paddingVertical: 30
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
    fontWeight: 'normal',
    backgroundColor: '#ccc',
    width: 'auto',
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
    margin: 10
  },
});
