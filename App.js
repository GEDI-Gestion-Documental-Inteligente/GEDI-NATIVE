import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native"; // Asegúrate de importar NavigationContainer
import TabNavigator from "./components/TabNavigator";
import { SiteScreen } from "./screens/SiteScreen";
import { ChildrenComponent } from "./components/ChildrenComponent";
import { NodeComponent } from "./screens/NodeComponent";
import { NodeContent } from "./components/NodeContent";

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
          options={{ headerShown: false }}
          component={TabNavigator}
        />
        <Stack.Screen
          name="Sites"
          options={{headerBackVisible: false }}
          component={SiteScreen}
        />
        <Stack.Screen name="Children" component={ChildrenComponent} />

        <Stack.Screen name="NodeComponent" component={NodeComponent}  />
        <Stack.Screen name="NodeContent" component={NodeContent} options={{headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
