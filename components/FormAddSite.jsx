import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, TextInput, Button, StyleSheet} from "react-native";

const FormAddSite = ({ onSubmit }) => {
  const [siteData, setSiteData] = useState({
    id: "",
    title: "",
    description: "",
    visibility: "moderado", // Por defecto, se establece como "moderado"
  });

  const handleInputChange = (field, value) => {
    setSiteData({ ...siteData, [field]: value });
  };

  const handleSubmit = () => {
    // Validar el formulario antes de enviar los datos
    if (siteData.id && siteData.title && siteData.description) {
      // Llamar a la función de onSubmit con los datos del sitio
      onSubmit(siteData);
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ID del sitio"
        onChangeText={(text) => handleInputChange("id", text)}
        value={siteData.id}
      />
      <TextInput
        style={styles.input}
        placeholder="Título"
        onChangeText={(text) => handleInputChange("title", text)}
        value={siteData.title}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        onChangeText={(text) => handleInputChange("description", text)}
        value={siteData.description}
      />
      <Picker
        selectedValue={siteData.visibility}
        style={styles.picker}
        onValueChange={(itemValue) => handleInputChange("visibility", itemValue)}
      >
        <Picker.Item label="Moderado" value="moderado" />
        <Picker.Item label="Privado" value="privado" />
      </Picker>
      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
});

export default FormAddSite;
