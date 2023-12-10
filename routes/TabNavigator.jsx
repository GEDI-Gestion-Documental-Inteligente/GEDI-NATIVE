import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivitiesScreen } from "../screens/ActivitiesScreen";
import { Entypo } from "@expo/vector-icons";
import { ChatScreen } from "../screens/ChatAlfredo";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigator } from "./StackNavigator";
import { PeopleScreen } from "../screens/PeopleScreen";
import { FontAwesome5 } from '@expo/vector-icons';
import { SitesListScreen } from "../screens/SitesListScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Sites"
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="#03484c" /> // Icono de Ionicons
          ),
          headerShown: false,
        }}
        component={StackNavigator}
      />

      {/* <Tab.Screen
        name="Activities"
        options={{
          tabBarLabel: "Actividades",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-list"
              size={24}
              color="#03484c"
            />
          ),
          headerShown: false,
        }}
        component={ActivitiesScreen}
      /> */}

      <Tab.Screen
        name="SitesList"
        options={{
          title: 'Gestionar Sitios',
          tabBarIcon: () => (
            <MaterialIcons
            name="workspaces-filled"
            size={24}
            color="#03484c"
          />
          ),
          headerShown: false,
          
        }}
        component={SitesListScreen}
      />

      {/* <Tab.Screen
        name="Tareas"
        options={{
          tabBarLabel: "Tareas",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pending-actions" size={24} color="#03484c" />
          ),
          headerShown: false,
        }}
        component={ChatScreen}
      /> */}
      <Tab.Screen
        name="People"
        options={{
          title: 'Gestionar usuarios',
          tabBarIcon: () => (
            <FontAwesome5 name="users-cog" size={24} color="#03484c" />
          ),
          headerShown: false,
          
        }}
        component={PeopleScreen}
      />

      <Tab.Screen
        name="Chat"
        options={{
          tabBarIcon: () => (
            <Ionicons name="md-chatbubble" size={24} color="#03484c" />
          ),
          headerShown: false,
          
        }}
        component={ChatScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
