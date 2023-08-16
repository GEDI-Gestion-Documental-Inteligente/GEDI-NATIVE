import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FolderScreen from "../screens/FolderScreen";
import { Register } from "../screens/Register";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    
      <Tab.Navigator>
        <Tab.Screen name="Tus directorios" component={FolderScreen} />
        <Tab.Screen name="Registrar usuarios" component={Register} />
      </Tab.Navigator>
  );
};

export default TabNavigator;
