import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, Button, StyleSheet, ToastAndroid, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from './styles';
import ip from "./ip";

const Terrarios = ({ route }) => {

  const navigation = useNavigation();
  const { correo } = route.params || {};
  const [terrarios, setTerrarios] = useState([]);
  const [numTer, setNumTer] = useState("")


  const traerChapulines = () => {
    fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/buscaTerrarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `correo=${correo}`,
    })
      .then(response => response.json())

      .then(result => {


        if (result.mensaje == "Terrarios encontrados") {
          setNumTer(result.numero)
          const terrariosEncontrados = [];
          for (let i = 1; i <= result.numero; i++) {
            terrariosEncontrados.push(result[i]);
          }
          setTerrarios(terrariosEncontrados);
        } else if (result.mensaje == "No se encontraron terrarios") {
          Toast.show('No tiene terrarios agregados', Toast.SHORT);
        }

      })
      .catch(error => {
        // Mostrar mensaje de error
        Toast.show('Hubo un error al buscar terrarios', Toast.SHORT);
      });

  }
  const mostrar = (idTerrario) => {
    console.log('CVE del terrario:', idTerrario);
    // Aquí puedes realizar la acción correspondiente al botón, por ejemplo, navegación a la pantalla de modificación
  };

  const renderTerrario = ({ item }) => (
    <View style={styles.container_terrario}>
      <Text style={styles.textterrarioTitulo}>Clave de terrario: {item.cve} </Text>
      <View style={{ flexDirection: 'row', }}>
        <Text style={styles.textterrarioH1}>Especie: </Text>
        <Text style={styles.textterrarioH2}>{item.especie} </Text>
      </View>
      <View style={{ flexDirection: 'row', }}>
        <Text style={styles.textterrarioH1}>Etapa:</Text>
        <Text style={styles.textterrarioH2}> {item.etapa} </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Terrario", { correo: correo, cve: item.cve })}
        style={styles.buttonterrario}>
        <Text style={styles.buttonText}>
          Ver Terrario
        </Text>
      </TouchableOpacity>
    </View>

  );

  useEffect(() => {
    traerChapulines();
  }, []);

  return (
    <View style={styles.container_sesion}>

      <View style={{ padding: 15, }}>

        <FlatList
          data={terrarios}
          renderItem={renderTerrario}
          keyExtractor={(item) => item.cve.toString()}
        />

      </View>

    </View>
  );
}

export default Terrarios;