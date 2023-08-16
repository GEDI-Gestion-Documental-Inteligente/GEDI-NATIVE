import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import FolderScreen from "./screens/FolderScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Inicio",
          headerShown:false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Registro",
          headerShown:false }}
        />
           <Stack.Screen
          name="FolderScreen"
          component={FolderScreen}
          options={{ title: "Registro",
          headerShown:false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}