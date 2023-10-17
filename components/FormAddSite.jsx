import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { createSite, getMySites } from "../redux/modules/sites/SitesThunks";

const FormAddSite = ({ onSubmit }) => {
  const dispatch = useDispatch()
  const [siteData, setSiteData] = useState({
    id: "",
    title: "",
    description: "",
    visibility: "MODERATED", // Por defecto, se establece como "moderado"
  });

  const handleInputChange = (field, value) => {
    setSiteData({ ...siteData, [field]: value });
  };

  const handleSubmit = async() => {
    // Validar el formulario antes de enviar los datos
    console.log('form', siteData)
    if (siteData.id != "" && siteData.title != "" && siteData.description != "") {
      await dispatch(createSite(siteData))
      await dispatch(getMySites())
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear un nuevo sitio</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe una id para el sitio"
        placeholderTextColor="#03484c"
        onChangeText={(text) => handleInputChange("id", text)}
        value={siteData.id}
      />
      <TextInput
        style={styles.input}
        placeholder="Escribe el nombre"
        placeholderTextColor="#03484c"
        onChangeText={(text) => handleInputChange("title", text)}
        value={siteData.title}
      />
      <TextInput
        style={styles.input}
        placeholder="Escribe alguna descripción"
        placeholderTextColor="#03484c"
        onChangeText={(text) => handleInputChange("description", text)}
        value={siteData.description}
      />
      <Picker
        selectedValue={siteData.visibility}
        style={styles.picker}
        onValueChange={(itemValue) =>
          handleInputChange("visibility", itemValue)
        }
      >
        <Picker.Item label="Publico" value="PUBLIC" />
        <Picker.Item label="Moderado" value="MODERATED" />
        <Picker.Item label="Privado" value="PRIVATE" />
      </Picker>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.textButton}>Crear sitio</Text>
      </Pressable>
      <Pressable style={styles.buttonCancel} onPress={onSubmit}>
        <Text style={styles.textButton}>Cancelar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: "#E6E7E6",
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderBottomColor: "#03484c",
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)"
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    color: "#03484c",
    marginBottom: 40
  },
  button: {
    backgroundColor: "#03484c",
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 5
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonCancel:{
    backgroundColor: "#C7CBC7",
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 5
  }
});

export default FormAddSite;
