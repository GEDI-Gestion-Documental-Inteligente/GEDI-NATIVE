import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SiteScreen } from "../screens/SiteScreen";
import { NodeChildScreen } from "../screens/NodeChildScreen";
import { NodeContent } from "../components/nodes/NodeContent";
import { PeopleScreen } from "../screens/PeopleScreen";

const Stack = createNativeStackNavigator();

export const StackNodes = () => {
  return (
    <Stack.Navigator initialRouteName="Sites">
      <Stack.Screen
        name="Sitios"
        component={SiteScreen}
        options={{ title: "Inicio", headerShown: false }}
      />
      <Stack.Screen
        name="Nodes"
        component={NodeChildScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="People"
        component={PeopleScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="NodeContent" component={NodeContent} />
    </Stack.Navigator>
  );
};
