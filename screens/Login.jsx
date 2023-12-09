import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginAndFetchTicket } from "../redux/modules/authLogin/authThunks";
import { Image } from "react-native";
import { ImageBackground } from "react-native";

export const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [textAlert, setTextAlert] = useState("");
  const token = useSelector((state) => state.auth.ticket);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    setBackgroundImage(require("../assets/fondo.jpg"));
  }, []);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const loguear = async () => {
    try {
      const ticket = await dispatch(loginAndFetchTicket({ userId, password }));
      if (ticket.payload) {
        navigation.navigate("Dashboard");
      } else {
        setTextAlert("Ha ocurrido un error. Compruebe los campos");
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error.message);
    }
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>GEDI</Text>

          <TextInput
            value={userId}
            onChangeText={setUserId}
            style={styles.formInput}
            placeholder="Ingrese su usuario"
            placeholderTextColor="#000000"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.formInput}
            placeholder="Ingrese su contraseña"
            placeholderTextColor="#000000"
            secureTextEntry={true}
          />

          <Pressable
            style={[styles.formButton, { width: 120 }]}
            onPress={loguear}
          >
            <Text style={styles.textButton}>Ingresar</Text>
          </Pressable>

          {textAlert && (
            <View style={styles.containerAlert}>
              <Text>{textAlert}</Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    gap: 20,
    paddingHorizontal: 30,
    paddingVertical: 30,
    width: 250,
    alignItems: "center",
  },
  formInput: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#03484c",
    width: 170,
  },
  formTitle: {
    textAlign: "center",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#03484c",
  },
  formButton: {
    backgroundColor: "#03484c",
    borderRadius: 5,
    paddingVertical: 10,
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  containerAlert:{
    backgroundColor: 'rgba(200, 0, 0, 0.2)',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccc'
  }
});

export default Login;
