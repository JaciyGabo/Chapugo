import React, {useState} from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Button, StyleSheet, ToastAndroid, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
import ip from "./ip";

const Perfil = ({route}) => {
const { correo } = route.params || {};
const navigation = useNavigation();

    const cerrarSesion = () => {
        fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/cierraSesion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `correo=${correo}`,    
        })
          .then(response => response.json())
              
          .then(result => {
 
            if(result.mensaje==  "Sesion Cerrada"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
                navigation.navigate("Login")
            }else if(result.mensaje== "Imposible cerrar sesion"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
            }
                })
          .catch(error => {
            // Mostrar mensaje de error
            ToastAndroid.show('Hubo un error al registrar usuario', ToastAndroid.SHORT);
          });
    }

    const misGraficas = () => {
      navigation.navigate("MisGraficas", {correo})
    }

    const misDatos = () => {
      navigation.navigate("MisDatos", {correo})
    }

    return(
       <View style={styles.container_sesion}>

            <TouchableOpacity
                onPress={misGraficas}
                style={styles.button_sesion}>
                <Text style={styles.buttonText}>Mis Gráficas</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={misDatos}
                style={styles.button_sesion}>
                <Text style={styles.buttonText}>Mis Datos</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={cerrarSesion}
                style={styles.button_cerrarsesion}>
                <Text style={styles.buttonText}>Cerrar Sesion</Text>
            </TouchableOpacity>
            <View style={styles.margen}></View>
       </View> 
    )
}

export default Perfil;