import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AltaTerrario from "./screens/AltaTerrario";
import Terrarios from "./screens/Terrarios";
import Perfil from "./screens/Perfil";

const Tab = createBottomTabNavigator();

function MyTabs({navigation, route}) {
  return (
    <Tab.Navigator
      initialRouteName="Terrarios"
      screenOptions={{
        tabBarActiveTintColor: 'rgb(7, 100, 131)',
      }}
    >
<Tab.Screen
  name="AltaTer"
  
  options={{
    tabBarLabel: 'Crear Terrario',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="bug" color={color} size={size} />
    ),
    headerShown: false,
  }}
>
  {() => <AltaTerrario route={route} />} 
</Tab.Screen>

     
<Tab.Screen
  name="Terrarios"
  options={{
    tabBarLabel: 'Mis Terrarios',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="alpha-t-box-outline" color={color} size={size} />
    ),
    headerShown: false,
  }}
>
  {() => <Terrarios route={route} />} 
</Tab.Screen>

<Tab.Screen
  name="Perfil"
  options={{
    tabBarLabel: 'Mi perfil',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="account-multiple-check" color={color} size={size} />
    ),
    headerShown: false,
  }}
>
  {() => <Perfil route={route} />} 
</Tab.Screen>
    </Tab.Navigator>
  );
}

export default MyTabs;