import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import {
  createPeople,
  editInformationPeople,
  getPeople,
} from "../../redux/modules/people/peopleThunks"; // Importa tu thunk de Redux

export const FormEditPeople = ({ user, onSubmit }) => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.auth.ticket);
  const [data, setData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    jobTitle: user.jobTitle,
  });

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleSubmit = async () => {
    // Validar el formulario antes de enviar los datos
    if (
      data.firstName !== "" &&
      data.lastName !== "" &&
      data.email !== "" &&
      data.jobTitle !== ""
    ) {
      await dispatch(editInformationPeople({ ticket, data, userId: user.id }));
      onSubmit();
      await dispatch(getPeople({ ticket }));
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconButton} onPress={onSubmit}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar datos</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={(text) => handleInputChange("firstName", text)}
          value={data.firstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          onChangeText={(text) => handleInputChange("lastName", text)}
          value={data.lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          onChangeText={(text) => handleInputChange("email", text)}
          value={data.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Cargo u ocupación"
          onChangeText={(text) => handleInputChange("jobTitle", text)}
          value={data.jobTitle}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable style={styles.buttonCancel} onPress={onSubmit}>
            <Text style={styles.textButton}>Cancelar</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textButton}>Guardar cambios</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#E6E7E6",
    borderRadius: 5,
    width: "90%",
  },
  input: {
    height: 40,
    width: "auto",
    borderBottomColor: "#03484c",
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    borderBottomWidth: 1
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
    width: 150
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
    width: 150
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
