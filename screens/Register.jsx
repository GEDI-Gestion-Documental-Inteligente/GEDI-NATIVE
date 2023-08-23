import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";
import axios from "axios";

export const Register = () => {
  const [data, setData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    skypeId: "flor",
    jobTitle: "",
  });
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: `Basic VElDS0VUX2QwMmMxZWNmNTRkODRkYmNiZTEyOTZiNTczZTM4MWRkOGQyNWM2OWI=`
    },
  };

  const addPerson = () => {
    console.log(data)
    axios
      .post(
        "http:192.168.217.211:8080/alfresco/api/-default-/public/authentication/versions/1/tickets",
        data,
        config
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log("no se puede", err.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Registro</Text>

        <View style={styles.formBody}>
          <Text style={styles.formText}>Informacion</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Ingrese el nombre del usuario"
            onChangeText={(text) => setData({ ...data, firstName: text })}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Ingrese el apellido del usuario"
            onChangeText={(text) => setData({ ...data, lastName: text })}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Ingrese el correo del usuario"
            onChangeText={(text) => setData({ ...data, email: text })}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Ingrese su cargo u ocupación"
            onChangeText={(text) => setData({ ...data, jobTitle: text })}
          />
        </View>

        <View style={styles.formBody}>
          <Text style={styles.formText}>Acerca del usuario</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Ingrese el nombre de usuario"
            onChangeText={(text) => setData({ ...data, id: text })}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Ingrese la contraseña del usuario"
            onChangeText={(text) => setData({ ...data, password: text })}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Verificar contraseña"
          />
        </View>

        <View style={styles.formBody}>
          <Pressable style={styles.formButton} onPress={addPerson}>
            <Text style={styles.textButton}>Registrar</Text>
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
    backgroundColor: "#4D6F5F",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  formContainer: {
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    height: 620,
    shadowColor: "black",
    width: 400,
    elevation: 10,

    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    paddingHorizontal: 75,
    paddingVertical: 25,
  },
  formInput: {
    width: 300,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  formBody: {
    marginVertical: 15,
  },
  formTitle: {
    position: "absolute",
    top: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#004725",
  },
  formText: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: "#004725",
  },
  formButton: {
    display: "flex",
    justifyContent: "center",
    width: 125,
    height: 40,
    backgroundColor: "#004725",
    borderRadius: 25,
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
