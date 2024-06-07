import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Button, StyleSheet, ToastAndroid, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import ip from "./ip";


const Token = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [token, setToken] = useState('');
    const { correo } = route.params;

    const verificarToken = () => {
        if (!token) {
            ToastAndroid.show('Ingrese tu Token', ToastAndroid.SHORT);
            return;
        }

        fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/validarToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `correo=${correo}&token=${token}`,    
          })
            .then(response => response.json())
                
            .then(result => {
   
              if(result.mensaje== "El token coincide"){
                  ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);

                  setToken("");
                  navigation.navigate("Validacion")

              }else if(result.mensaje== "El token no coincide"){
                  setToken("");
                 
                  ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
              }
                  console.log(result)
  
                  })
            .catch(error => {
              // Mostrar mensaje de error
              ToastAndroid.show('Hubo un error', ToastAndroid.SHORT);
            });
    }
  
    return (
        <View style={styles.container}>
            
            <Text style={styles.text}>Es hora de verificar</Text>
            <Text style={styles.text}> tu correo.</Text>
            <Text style={styles.textInput}>Ingresa el Token:</Text>

            <TextInput
                style={styles.input}
                placeholder="*****"
                value={token}
                onChangeText={setToken}
            />



                <View style={styles.buttonContainer}>

                <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                        style={styles.buttonn}>
                        <Text style={styles.buttonText}>regresar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        onPress={verificarToken}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Validar</Text>
                    </TouchableOpacity>

                   

                    
                </View>
        </View>
    );
}


export default Token;