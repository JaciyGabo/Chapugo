import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Button, StyleSheet, ToastAndroid, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import ip from "./ip";
import { app } from "../firebase";

import { onValue, update } from "firebase/database";

import { getDatabase, ref } from "firebase/database";



const Terrario = () => {
  const route = useRoute();
  const correo = route.params.correo;
  const cve = route.params.cve;
  const navigation = useNavigation();

  const [idusu, setIdUsu] = useState('');
  const [humReq, setHumReq] = useState('');
  const [tempReq, setTempReq] = useState('');

  const [datosTerrario, setDatosTerrario] = useState(null);
  const db = getDatabase(app);
  const terrarioRef = ref(db, `Criadores/${idusu}/${cve}`);

  const traerDatos = () => {
    fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/criador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `correo=${correo}`,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener datos del usuario');
        }
        return response.json();
      })
      .then(result => {
        if (result.mensaje === "Datos del usuario recuperados") {
          //ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
          setIdUsu(result.usuario.id);
        } else if (result.mensaje === "No se encontraron datos del usuario con el correo proporcionado") {
          ToastAndroid.show('No se encontraron datos', ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        ToastAndroid.show('Hubo un error al obtener datos del usuario', ToastAndroid.SHORT);
      });
  }
  const datosTer = () => {
    fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/requerimientos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `cve=${cve}`,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener datos del chapulin');
        }
        return response.json();
      })
      .then(result => {
        if (result.mensaje === "Datos Recuperados") {
          //ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
        } else if (result.mensaje === "No hay Datos") {
          ToastAndroid.show('No se encontraron datos', ToastAndroid.SHORT);
        }

        setHumReq(result.alumnos[0].humedad_req)
        setTempReq(result.alumnos[0].temperatura_req)
      })
      .catch(error => {
        ToastAndroid.show('Hubo un error al obtener datos', ToastAndroid.SHORT);
      });
  }
  const volver = () => {
    navigation.navigate("MyTabs", { correo });
    console.log(datosTerrario);
  }
  const Colecta = () => {
    navigation.navigate("Colecta", { correo, idusu, cve });
    //console.log(datosTerrario);
  }
  const toggleFoco = async () => {
    if (!datosTerrario) {
      return; // Prevent errors if data hasn't been fetched yet
    }

    const newFocoValue = datosTerrario.Foco === 0 ? 1 : 0;

    try {
      await update(terrarioRef, { Foco: newFocoValue });
      setDatosTerrario({ ...datosTerrario, Foco: newFocoValue }); // Update local state for immediate UI feedback
    } catch (error) {
      console.error("Error updating Foco:", error);
      ToastAndroid.show('Error al actualizar Foco', ToastAndroid.SHORT);
    }
  };

  const toggleVentilador= async () => {
    if (!datosTerrario) {
      return; // Prevent errors if data hasn't been fetched yet
    }

    const newVentiladorValue = datosTerrario.Ventilador === 0 ? 1 : 0;

    try {
      await update(terrarioRef, { Ventilador: newVentiladorValue });
      setDatosTerrario({ ...datosTerrario, Ventilador: newVentiladorValue }); // Update local state for immediate UI feedback
    } catch (error) {
      console.error("Error updating Foco:", error);
      ToastAndroid.show('Error al actualizar Foco', ToastAndroid.SHORT);
    }
  };
  
  const toggleHumidificador= async () => {
    if (!datosTerrario) {
      return; // Prevent errors if data hasn't been fetched yet
    }

    const newHumidificadorValue = datosTerrario.Humidificador === 0 ? 1 : 0;

    try {
      await update(terrarioRef, { Humidificador: newHumidificadorValue });
      setDatosTerrario({ ...datosTerrario, Humidificador: newHumidificadorValue }); // Update local state for immediate UI feedback
    } catch (error) {
      console.error("Error updating Foco:", error);
      ToastAndroid.show('Error al actualizar Foco', ToastAndroid.SHORT);
    }
  };


  useEffect(() => {
    traerDatos();
    datosTer();


    const unsubscribe = onValue(terrarioRef, (snapshot) => {
      const data = snapshot.val();
      setDatosTerrario({
        Foco: data ? data.Foco : 'Sin datos',
        Humedad: data ? data.Humedad : 'Sin datos',
        Humidificador: data ? data.Humidificador : 'Sin datos',
        Peso: data ? data.Peso : 'Sin datos',
        Temperatura: data ? data.Temperatura : 'Sin datos',
        Ventilador: data ? data.Ventilador : 'Sin datos',
      });
    });

    return () => unsubscribe();
  }, [idusu]); // Trigger effect when idusu changes

  return (
    <View style={styles.container_sesion}>
        <View style={styles.container_text}>
            <Text style={styles.text_conta}>Tus chapulines necesitan una temperatura entre {tempReq} y una humedad entre {humReq} </Text>
        </View>

        <Text style={[styles.text2, { fontWeight: 'normal', fontSize: 28, marginTop: 150}]}>Humedad: <Text style={[styles.text2, { fontWeight: 'bold', fontSize: 28,}]}>{datosTerrario ? datosTerrario.Humedad + "%" : 'Cargando...'}</Text>  </Text>
        <Text style={[styles.text2, { fontWeight: 'normal', fontSize: 28, marginBottom: 50}]}>Temperatura: <Text style={[styles.text2, { fontWeight: 'bold', fontSize: 28,}]}>{datosTerrario ? datosTerrario.Temperatura + "°" : 'Cargando...'}</Text>  </Text>

        <View style={[styles.buttonContainer]}>

            <Text style={[styles.text22, { fontWeight: 'normal', }]}>Foco:  </Text>

            {datosTerrario && (
                <TouchableOpacity
                    onPress={toggleFoco}
                    style={[styles.buttonEditar, { backgroundColor: datosTerrario.Foco == 1 ? '#01847C' : '#a31f1add' }]}>
                    <Text style={styles.buttonText}>{datosTerrario.Foco == 1 ? 'Encendido ' : 'Apagado'}</Text>
                </TouchableOpacity>
            )}

        </View>

        <View style={[styles.buttonContainer]}>

            <Text style={[styles.text22, { fontWeight: 'normal', }]}>Ventilador:  </Text>

            {datosTerrario && (
                <TouchableOpacity
                    onPress={toggleVentilador}
                    style={[styles.buttonEditar, { backgroundColor: datosTerrario.Ventilador == 1 ? '#01847C' : '#a31f1add' }]}>
                    <Text style={styles.buttonText}>{datosTerrario.Ventilador == 1 ? 'Encendido ' : 'Apagado'}</Text>
                </TouchableOpacity>
            )}

        </View>
        <View style={[styles.buttonContainer]}>

            <Text style={[styles.text22, { fontWeight: 'normal', }]}>Humidificador:  </Text>

            {datosTerrario && (
                <TouchableOpacity
                    onPress={toggleHumidificador}
                    style={[styles.buttonEditar, { backgroundColor: datosTerrario.Humidificador == 1 ? '#01847C' : '#a31f1add' }]}>
                    <Text style={styles.buttonText}>{datosTerrario.Humidificador == 1 ? 'Encendido ' : 'Apagado'}</Text>
                </TouchableOpacity>
            )}

        </View>

        <TouchableOpacity
            onPress={Colecta}
            style={[styles.button_sesion, { fontWeight: 'normal',  marginTop: 50}]}>
            <Text style={styles.buttonText}>Realizar Colecta</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={volver}
            style={[styles.button_sesion, { fontWeight: 'normal',  marginTop: 20}]}>
            <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>

    </View>
)

}

export default Terrario;