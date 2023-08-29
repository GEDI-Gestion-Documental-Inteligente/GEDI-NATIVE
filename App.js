import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native"; // Asegúrate de importar NavigationContainer
import { SiteScreen } from "./screens/SiteScreen";
import { NodeChildScreen} from "./screens/NodeChildScreen";
import { NodeContent } from "./components/NodeContent";
import { Provider } from "react-redux";
import store from "./redux/store/store";


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
          name="Home"
          options={{ headerShown: false }}
          component={TabNavigator}
        />
        <Stack.Screen
          name="Sites"
          options={{headerBackVisible: false }}
          component={SiteScreen}
        />
   

        <Stack.Screen name="Nodes" component={NodeChildScreen}  />
        <Stack.Screen name="NodeContent" component={NodeContent} options={{headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
