
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Registro from "./screens/Registro";
import Token from "./screens/Token";
import validacion from "./screens/Validacion";
import MyTabs from "./MyTabs";
import EditarEliminar from "./screens/EditarEliminar";
import MisDatos from "./screens/MisDatos";
import MisGraficas from "./screens/MisGraficas";
import Terrario from "./screens/Terrario";
import Colecta from "./screens/Colecta";

const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <HomeStackNavigator.Navigator initialRouteName="Login">
        <HomeStackNavigator.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <HomeStackNavigator.Screen
          name="Registro"
          component={Registro}
          options={{
            headerShown: false,
          }}
        />
        <HomeStackNavigator.Screen
          name="Token"
          component={Token}
          options={{
            headerShown: false,
          }}
        />
        <HomeStackNavigator.Screen
          name="Validacion"
          component={validacion}
          options={{
            headerShown: false,
          }}
        />
        <HomeStackNavigator.Screen
          name="MyTabs"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
        <HomeStackNavigator.Screen
          name="EditarEliminar"
          component={EditarEliminar}
          options={{
            headerShown: false,
          }}
        />
        <HomeStackNavigator.Screen
          name="MisDatos"
          component={MisDatos}
          options={{
            headerShown: false,
          }}
        />
        <HomeStackNavigator.Screen
          name="MisGraficas"
          component={MisGraficas}
          options={{
            headerShown: false,
          }}
        />
        <HomeStackNavigator.Screen
          name="Terrario"
          component={Terrario}
          options={{
            headerShown: false,
          }}
        />
        <HomeStackNavigator.Screen
          name="Colecta"
          component={Colecta}
          options={{
            headerShown: false,
          }}
        />
      </HomeStackNavigator.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;