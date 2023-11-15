import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SiteScreen } from "../screens/SiteScreen";
import { NodeChildScreen } from "../screens/NodeChildScreen";
import { NodeContent } from "../components/nodes/NodeContent";
import { PeopleScreen } from "../screens/PeopleScreen";
import { SitesListScreen } from "../screens/SitesListScreen";
import { InformationSite } from "../screens/InformationSite";
import { ManageSiteMembers } from "../components/sites/ManageSiteMembers";
import { SiteMembersScreen } from "../screens/SiteMembersScreen";
const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
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

      <Stack.Screen
        name="SitesList"
        component={SitesListScreen}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="InformationSite"
        component={InformationSite}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ManageSiteMembers"
        component={SiteMembersScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="NodeContent" component={NodeContent} />
    </Stack.Navigator>
  );
};
