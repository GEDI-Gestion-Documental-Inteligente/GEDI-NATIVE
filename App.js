import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native"; // Asegúrate de importar NavigationContainer
import { SiteScreen } from "./screens/SiteScreen";
import { NodeChildScreen} from "./screens/NodeChildScreen";
import { NodeContent } from "./components/NodeContent";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { ActivitiesScreen } from "./screens/ActivitiesScreen";


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
          name="Sites"
          options={{headerBackVisible: false, headerShown: false  }}
          component={SiteScreen}
        />
   

        <Stack.Screen name="Nodes" component={NodeChildScreen}  />
        <Stack.Screen name="NodeContent" component={NodeContent} options={{headerBackVisible: false }} />

        <Stack.Screen name="Activities" component={ActivitiesScreen} options={{headerBackVisible: false,  title: "Inicio" }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
