import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatusPeople,
  getPeople,
} from "../../redux/modules/people/peopleThunks";

export const FormStatus = ({ user, onSubmit }) => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.auth.ticket);
  const [status, setStatus] = useState({
    enabled: user.enabled,
  });

  const handleInputChange = (value) => {
    setStatus({ enabled: value });
  };

  const handleSubmit = async () => {
    await dispatch(
      changeStatusPeople({ userId: user.id, value: status.enabled, ticket })
    );
    await dispatch(getPeople({ ticket }));
  };
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton} onPress={onSubmit}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Deshabilitar o habilitar un usuario</Text>

        <Picker
          selectedValue={status.enabled}
          style={styles.picker}
          onValueChange={(itemValue) => handleInputChange(itemValue)}
        >
          <Picker.Item label="Habilitar" value={true} />
          <Picker.Item label="Deshabilitar" value={false} />
        </Picker>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.textButton}>Cambiar</Text>
        </Pressable>
        <Pressable style={styles.buttonCancel} onPress={onSubmit}>
          <Text style={styles.textButton}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#E6E7E6",
    borderRadius: 15,
    width: "90%",
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
    marginBottom: 20,
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
});
