import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Button, StyleSheet, ToastAndroid, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import ip from "./ip";
import { Dimensions } from "react-native";
import {
  LineChart,
} from "react-native-chart-kit";
import ComponenteGraf from "./ComponenteGraf";


const MisGraficas = () => {

  const [datos, setDatos] = useState([])
  const route = useRoute();
  const correo = route.params.correo;
  const navigation = useNavigation();

  const volver = () => {
    navigation.navigate("MyTabs", { correo })
    //console.log(Dimensions.get("window").width)
  }
  const transformDataForChart = (data) => {
    return Object.keys(data).slice(0, data.cantidad_cve).map(key => {
      const item = data[key];
      return {
        title: `Terrario ${key}`,
        chartData: {
          labels: item.fechas.map(date => new Date(date).toLocaleDateString('es-ES', { month: 'short' })),
          datasets: [{
            data: item.pesos.map(weight => parseFloat(weight))
          }]
        }
      };
    });
  };
  
  const chartData = transformDataForChart(datos);
  
  const traerGraficas = () => {
    fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/graficaProduccion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `correo=${correo}`,    
        })
          .then(response => response.json())
              
          .then(result => {
            
 
            if(result.mensaje== "Datos conseguidos"){
              ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
              console.log(result)
              setDatos(result)

            }else if(result.mensaje== "No se encontraron datos"){
              ToastAndroid.show('Aún no tienes producción', ToastAndroid.SHORT);
            }
            
        })
        .catch(error => {
            // Mostrar mensaje de error
            ToastAndroid.show('Hubo un error', ToastAndroid.SHORT);
        });
  }


  useEffect(() => {
    traerGraficas()
  }, []);

  return (
    <View style={styles.container_sesion}>
      <Text style={styles.text}> Mis graficas </Text>
      
      <View style={{ width: '75%', height: '75%' }}>
        <ScrollView style={{width:320, height:10}}>
            <ComponenteGraf chartData={chartData} />
        </ScrollView>
      </View>
      
    
      
      <TouchableOpacity
        onPress={volver}
        style={styles.buttonEditar}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>

    </View>
  )
}

export default MisGraficas;