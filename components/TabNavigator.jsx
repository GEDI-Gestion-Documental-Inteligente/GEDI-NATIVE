import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SiteScreen } from "../screens/SiteScreen";
import { NodeChildScreen } from "../screens/NodeChildScreen";
import { NodeContent } from "./NodeContent";
import { ActivitiesScreen } from "../screens/ActivitiesScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Sites"
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" size={size} color={color} /> // Icono de Ionicons
          ),
          headerShown: false,
        }}
        component={SiteScreen}
      />

      <Tab.Screen
        name="Activities"
        options={{
          tabBarLabel: "Activities",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-calendar" size={size} color={color} />
          ),
          headerShown: false,
        }}
        component={ActivitiesScreen}
      />

    
    </Tab.Navigator>
  );
};

export default TabNavigator;
