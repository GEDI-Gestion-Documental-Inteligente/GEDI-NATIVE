import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginAndFetchTicket } from "../redux/modules/authLogin/authThunks";

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
          // ticket && navigation.navigate("Dashboard");
          if(ticket){
            navigation.navigate('Dashboard')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Alfredo IA</Text>

        <TextInput
          value={userId}
          onChangeText={setUserId}
          style={styles.formInput}
          placeholder="Ingrese su usuarioo"
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

        <Pressable style={[styles.formButton, {width: 120}]} onPress={loguear}>
          <Text style={styles.textButton}>Ingresar</Text>
        </Pressable>

        {isAuthenticated && <Text>Autenticado correctamente</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#03484c",
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: 5,
    gap:20,
    paddingHorizontal:30,
    paddingVertical:30,
    minWidth:250,
    alignItems:"center"
  
  },
  formInput: {
    paddingVertical:10,
    paddingHorizontal:5,
    borderBottomWidth:1,
    borderBottomColor:"#03484c",
    width: 170
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
    paddingVertical:10,
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Login;
