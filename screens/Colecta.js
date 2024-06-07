import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Button, StyleSheet, ToastAndroid, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import ip from "./ip";
import { app } from "../firebase";

import { onValue, update } from "firebase/database";

import { getDatabase, ref } from "firebase/database";


const Colecta = () => {
  const route = useRoute();
  const correo = route.params.correo;
  const idusu = route.params.idusu;
  const cve = route.params.cve;
  const navigation = useNavigation();
  
  const [peso, setPeso] = useState(null);
  
  const db = getDatabase(app);
  const terrarioRef = ref(db, `Criadores/${idusu}/${cve}`);

  useEffect(() => {

    const unsubscribe = onValue(terrarioRef, (snapshot) => {
      const data = snapshot.val();
      //console.log(data)
      setPeso({
        Peso: data ? data.Peso : 'Sin datos',
      });

    });

    //console.log(peso)
    return () => unsubscribe();
  }, []); // Trigger effect when idusu changes

  const volver = () => {
    navigation.navigate("Terrario", { correo, idusu, cve });
    //console.log(peso)
  }
  const Agregar = () => {


    fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/insertarColecta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `cve=${cve}&peso=${peso.Peso.toFixed(0)}`,    
    })
      .then(response => response.json())
          
      .then(result => {
        

        if(result.mensaje== "TError al insertar colecta"){
            ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);

        }else if(result.mensaje== "Colecta insertada correctamente"){
            ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);

        }

            console.log(result)

        })
      .catch(error => {
        // Mostrar mensaje de error
        ToastAndroid.show('Hubo un error al insertar terrario', ToastAndroid.SHORT);
      });

} 
  return (
    <View style={styles.container_sesion}>

      <Text style={[styles.text2, { fontWeight: 'normal', fontSize: 28}]}>Peso: <Text style={[styles.text2, { fontWeight: 'bold', fontSize: 28,}]}>{peso ? peso.Peso.toFixed(0) + "g." : 'Cargando...'}</Text>  </Text>

      <TouchableOpacity
            onPress={Agregar}
            style={[styles.button_sesion, { fontWeight: 'normal',  marginTop: 20, backgroundColor: '#01847C'}]}>
            <Text style={styles.buttonText}>Insertar Colecta</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={volver}
            style={[styles.button_sesion, { fontWeight: 'normal',  marginTop: 20}]}>
            <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Colecta
