import React, { useRef, useState } from "react";
import { encode, decode } from "base-64";
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export const Login = () => {
  const navigation = useNavigation();
  const inputUser = useRef();
  const inputPassword = useRef();
  const [data, setData] = useState({
    userId: "",
    password: "",
  });
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  // Configuración global de la biblioteca base-64
  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }

  const loguear = () => {
    console.log(data);
    axios
      .post(
        "http:192.168.217.211:8080/alfresco/api/-default-/public/authentication/versions/1/tickets",
        data,
        config
      )
      .then((res) => {
        const ticket = res.data.entry.id;
        console.log(btoa(ticket));

        navigation.navigate("FolderScreen");
      })
      .catch((err) => console.log("no se puede", err.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Iniciar Sesión</Text>

        <View style={styles.formBody}>
          <TextInput
            ref={inputUser}
            style={styles.formInput}
            placeholder="Ingrese su usuario"
            placeholderTextColor="#000000"
            onChangeText={(text) => setData({ ...data, userId: text })}
          />
          <TextInput
            ref={inputPassword}
            style={styles.formInput}
            placeholder="Ingrese su password"
            placeholderTextColor="#000000"
            onChangeText={(text) => setData({ ...data, password: text })}
          />
        </View>

        <View>
          <Pressable style={styles.formButton} onPress={loguear}>
            <Text style={styles.textButton}>Ingresar</Text>
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
    display: "flex",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    height: 400,
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
    paddingVertical: 35,
  },
  formInput: {
    width: 300,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 15,
    borderWidth: 1,
  },
  formBody: {
    marginVertical: 15,
  },
  formTitle: {
    position: "absolute",
    top: 50,
    fontSize: 30,
    fontWeight: "bold",
    color: "#004725",
  },
  formButton: {
    display: "flex",
    justifyContent: "center",
    width: 135,
    height: 50,
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
