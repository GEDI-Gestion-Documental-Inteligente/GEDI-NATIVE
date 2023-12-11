import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createSite, getMySites } from "../../redux/modules/sites/SitesThunks";

const FormAddSite = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.auth.ticket);
  const [siteData, setSiteData] = useState({
    id: "",
    title: "",
    description: "",
    visibility: "MODERATED", // Por defecto, se establece como "moderado"
  });

  const handleInputChange = (field, value) => {
    setSiteData({ ...siteData, [field]: value });
  };

  const handleSubmit = async () => {
    // Validar el formulario antes de enviar los datos
    console.log("form", siteData);
    if (
      siteData.id != "" &&
      siteData.title != "" &&
      siteData.description != ""
    ) {
      await dispatch(createSite({ ticket, siteData }));
      await dispatch(getMySites({ ticket }));
      alert("Sitio creado correctamente");
      onSubmit();
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Crear un nuevo sitio</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe una id para el sitio"
          placeholderTextColor="#808080"
          onChangeText={(text) => handleInputChange("id", text)}
          value={siteData.id}
        />
        <TextInput
          style={styles.input}
          placeholder="Escribe el nombre"
          placeholderTextColor="#808080"
          onChangeText={(text) => handleInputChange("title", text)}
          value={siteData.title}
        />
        <TextInput
          style={styles.input}
          placeholder="Escribe alguna descripción"
          placeholderTextColor="#808080"
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

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable style={styles.buttonCancel} onPress={onSubmit}>
            <Text style={styles.textButton}>Cancelar</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textButton}>Crear sitio</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  containerForm: {
    padding: 30,
    backgroundColor: "#E6E7E6",
    display: "flex",
  },
  input: {
    height: 40,
    borderBottomColor: "#03484c",
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
   borderBottomWidth:1
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
    marginBottom: 40,
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
});

export default FormAddSite;
