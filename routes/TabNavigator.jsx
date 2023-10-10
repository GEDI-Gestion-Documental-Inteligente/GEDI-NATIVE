import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivitiesScreen } from "../screens/ActivitiesScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ChatScreen } from "../screens/ChatAlfredo";
import { StackNodes } from "./StackNodes";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Sites"
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" size={30} color="#03484c" /> // Icono de Ionicons
          ),
          headerShown: false,
        }}
        component={StackNodes}
      />

      <Tab.Screen
        name="Activities"
        options={{
          tabBarLabel: "Actividades",
          tabBarIcon: ({ color, size }) => (
            <Feather name="activity" size={30} color="#03484c" />
          ),
          headerShown: false,
        }}
        component={ActivitiesScreen}
      />

      <Tab.Screen
        name="Tareas"
        options={{
          tabBarLabel: "Tareas",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="tasks" size={30} color="#03484c" />
          ),
          headerShown: false,
        }}
        component={ChatScreen}
      />

      <Tab.Screen
        name="toolsAdmin"
        options={{
          tabBarLabel: "Herramientas",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="admin-panel-settings" size={30} color="#03484c" />
          ),
          headerShown: false,
        }}
        component={ChatScreen}
      />

      <Tab.Screen
        name="Chat"
        options={{
          tabBarIcon: () => (
            <Ionicons name="md-chatbubble" size={30} color="#03484c" />
          ),
          headerShown: false,
        }}
        component={ChatScreen}
      />

    </Tab.Navigator>
  );
};

export default TabNavigator;
