import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Button, StyleSheet, ToastAndroid, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
import ip from "./ip";

const Registro = () => {


    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [contra, setContraseña] = useState('');
    const [contra2, setContraseña2] = useState('');
    let token = Math.floor(Math.random() * 100000).toString().padStart(5, '0');



    const enviarCorreo = (tok) => {
        fetch('http://'+ip+'/servicios/Recuperacion_password/envioGmail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(correo)}&token=${tok}`,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.text();
        })
        .then(result => {
            if (result === "No llegaron datos") {
                ToastAndroid.show(result, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Correo enviado", ToastAndroid.SHORT);

            }
            console.log(result)
        })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            ToastAndroid.show('No se pudo enviar el correo', ToastAndroid.SHORT); 
             console.log(error)
        });
    };

    const handleRegistro = () => {
        if (!nombre) {
            //navigation.navigate('Token');
            ToastAndroid.show('Ingrese un nombre', ToastAndroid.SHORT);
            return;
        } else if (!apellidos) {
            ToastAndroid.show('Ingrese un Apellido', ToastAndroid.SHORT);
            return;
        }else if (!correo) {
            ToastAndroid.show('Ingrese un Correo', ToastAndroid.SHORT);
            return;
        }else if (!contra) {
            ToastAndroid.show('Ingrese una Contraseña', ToastAndroid.SHORT);
            return;
        }else if (!contra2) {
            ToastAndroid.show('Repite tu contraseña', ToastAndroid.SHORT);
            return;
        }else if (contra != contra2){
            ToastAndroid.show('Las contraseñas no coinciden', ToastAndroid.SHORT);
            return;
        }
    
        fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/altaEmpleado', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `nombre=${nombre}&apellido=${apellidos}&correo=${correo}&contra=${contra}&token=${token}`,    
        })
          .then(response => response.json())
              
          .then(result => {
 
            if(result.mensaje== "Registro correctamente"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
                enviarCorreo(token)
                setNombre("");
                setApellidos("");
                setContraseña("");
                setContraseña2("");
                setCorreo("");
                navigation.navigate("Token", { correo })
            }else if(result.mensaje== "Error al insertar el registro"){
                setNombre("");
                setApellidos("");
                setContraseña("");
                setContraseña2("");
                setCorreo("");
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
            }else if(result.mensaje== "Error en el formato del correo"){
                setCorreo("");
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
            }else if(result.mensaje== "El correo ya esta registrado"){
                setNombre("");
                setApellidos("");
                setContraseña("");
                setContraseña2("");
                setCorreo("");
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
            }
                console.log(result)

                })
          .catch(error => {
            // Mostrar mensaje de error
            ToastAndroid.show('Hubo un error al registrar usuario', ToastAndroid.SHORT);
          });
    };
      
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
        
            <Text style={styles.text}>Regístrate </Text>
            <Text style={styles.textInput}>Nombre(s):</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
                 <Text style={styles.textInput}>Apellidos:</Text>
            <TextInput
                style={styles.input}
                placeholder="Apellidos"
                value={apellidos}
                onChangeText={setApellidos}
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
            <Text style={styles.textInput}>Confirma tu contraseña:</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={contra2}
                onChangeText={setContraseña2}
            />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                        style={styles.buttonn}>
                        <Text style={styles.buttonText}>Volver</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleRegistro}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
}


export default Registro;