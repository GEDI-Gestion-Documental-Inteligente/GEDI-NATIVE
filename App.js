import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux/store";
import TabNavigator from "./routes/TabNavigator";
import { NodeChildScreen } from "./screens/NodeChildScreen";
import { NodeContent } from "./components/nodes/NodeContent";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Inicio", headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={TabNavigator}
            options={{ headerShown: false }}
          />

         
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
