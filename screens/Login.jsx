import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginAndFetchTicket } from "../redux/services/authThunks";

export const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const loguear = async () => {
    try {
      dispatch(loginAndFetchTicket({ userId, password }))
        .then((ticket) => {
          ticket && navigation.navigate("Sites");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Alfredo IA</Text>

        <View style={styles.formBody}>
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
        </View>

        <View>
          <Pressable style={styles.formButton} onPress={loguear}>
            <Text style={styles.textButton}>Ingresar</Text>
          </Pressable>
        </View>

        {isAuthenticated && <Text>Autenticado correctamente</Text>}
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
    width: 350,
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
    top: 25,
    fontSize: 25,
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

export default Login;
