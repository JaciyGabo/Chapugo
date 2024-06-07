import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Button, StyleSheet, ToastAndroid, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import ip from "./ip";

const MisDatos = () => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [contra, setContraseña] = useState('');
    const [contra2, setContraseña2] = useState('');

    const route = useRoute();
    const correo = route.params.correo;
    const navigation = useNavigation();

    const volver = () => {
        navigation.navigate("MyTabs", { correo })
    }

    const guardar = () => {
        if (!nombre) {
            ToastAndroid.show('Ingrese un nombre', ToastAndroid.SHORT);
            return;
        } else if (!apellidos) {
            ToastAndroid.show('Ingrese un Apellido', ToastAndroid.SHORT);
            return;
        }
    
        fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/modificaEmpleado', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `nombre=${nombre}&apellido=${apellidos}&correo=${correo}`,    
        })
          .then(response => response.json())
              
          .then(result => {
 
            if(result.mensaje== "Datos actualizados correctamente"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
            }else if(result.mensaje== "Error al actualizar datos"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
            }else if(result.mensaje== "Algo salio mal"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
            }
                console.log(result)
                })
          .catch(error => {
            // Mostrar mensaje de error
            ToastAndroid.show('Hubo un error al actualizar usuario', ToastAndroid.SHORT);
          });
    }

    const traerDatos = () => {
        fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/criador', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `correo=${correo}`,
        })
            .then(response => response.json())

            .then(result => {


                if (result.mensaje == "Datos del usuario recuperados") {
                    ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);

                    setNombre(result.usuario.nombre)
                    setApellidos(result.usuario.apellido)

                } else if (result.mensaje == "No se encontraron datos del usuario con el correo proporcionado") {
                    ToastAndroid.show('No se encontraron datos', ToastAndroid.SHORT);
                }

            })
            .catch(error => {
                // Mostrar mensaje de error
                ToastAndroid.show('Hubo un error', ToastAndroid.SHORT);
            });
    }

    useEffect(() => {
        traerDatos()
    }, []);

    return (
        <View style={styles.container_sesion}>
            <Text style={styles.text}> Mis datos </Text>
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
            <Text
                style={styles.input}
            > {correo}</Text>

            <View style={[styles.buttonContainer]}>

                <TouchableOpacity
                    onPress={volver}
                    style={[styles.buttonEditar, { backgroundColor: '#01847C', marginEnd:15}]}>
                    <Text style={styles.buttonText}>Volver</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={guardar}
                    style={styles.buttonEditar}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
}

export default MisDatos;