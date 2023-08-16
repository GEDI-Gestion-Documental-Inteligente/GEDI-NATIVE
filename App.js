import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login";

import { NavigationContainer } from "@react-navigation/native"; // Asegúrate de importar NavigationContainer
import TabNavigator from "./components/TabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Inicio", headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false }}
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
