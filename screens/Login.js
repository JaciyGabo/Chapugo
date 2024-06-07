 import React, {useState} from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Button, StyleSheet, ToastAndroid, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
import ip from "./ip";


const Login = () => {


    const navigation = useNavigation();
    const [correo, setCorreo] = useState('');
    const [contra, setContraseña] = useState('');

    const verificarDatos = () => {
        if (!correo) {
            ToastAndroid.show('Ingrese un Correo', ToastAndroid.SHORT);
            return;
        }else if (!contra) {
            ToastAndroid.show('Ingrese una Contraseña', ToastAndroid.SHORT);
            return;
        }

        fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/verificarUsuario', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `correo=${correo}&contra=${contra}`,    
          })
            .then(response => response.json())
                
            .then(result => {
   
              if(result.mensaje== "Aun no has verificado tu correo"){
                  ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
                  setContraseña("");
                  setCorreo("");
                  navigation.navigate("Token", { correo })
              }else if(result.mensaje== "Esperando validacion de un administrador"){
                  setContraseña("");
                  setCorreo("");
                  navigation.navigate("Validacion")
                  ToastAndroid.show("Esperando validación de un administrador", ToastAndroid.SHORT);
              }else if(result.mensaje== "Tu cuenta esta siendo usada en otro dispositivo"){
                setContraseña("");
                setCorreo("");
                  ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
              }else if(result.mensaje== "Datos correctos"){
                setContraseña("");
                setCorreo("");
                  ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
                  navigation.navigate("MyTabs", { correo: correo });

              }else if(result.mensaje== "Datos correctos Admin"){
                setContraseña("");
                setCorreo("");
                  ToastAndroid.show("Esta aplicación es solo para empleados", ToastAndroid.SHORT);
              }
                  console.log(result)
  
                  })
            .catch(error => {
              // Mostrar mensaje de error
              ToastAndroid.show('Correo o contraseña incorrectos', ToastAndroid.SHORT);
            });

    }

    return (
        <View style={styles.container}>
            <Image
                source={{
                uri: 'http://dtai.uteq.edu.mx/~jacqui209/img/chapu.png',
                
                }}
                style={{ width: 300, height: 300 }}
            />
            <Text style={styles.textInput}>Correo:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ejemplo@gmail.com"
                keyboardType="email-address"
                value={correo}
                onChangeText={setCorreo}
            />

            <Text style={styles.textInput}>Contraseña:</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={contra}
                onChangeText={setContraseña}
            />

                <View style={styles.buttonContainer}>

                <TouchableOpacity
                        onPress={() => navigation.navigate("Registro")}
                        style={styles.buttonnn}>
                        <Text style={styles.buttonText}>Registrarme</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={verificarDatos}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Ingresar</Text>


                    </TouchableOpacity>

                   

                    
                </View>
        </View>
    );
}


export default Login;