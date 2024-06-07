import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Modal, Image, TextInput, Button, StyleSheet, ToastAndroid, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import MapView, {Marker, Polyline} from "react-native-maps";
import styles from './styles';
import ip from "./ip";
import * as Location from 'expo-location'
import DropDownPicker from 'react-native-dropdown-picker';


const EditarEliminar = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const correo = route.params.correo
    const [clavebuscar, setClavebuscar] =useState("")
    const [claveeliminar, setClaveeliminar] =useState("")

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Sphenarium purpurascens', value: 'Sphenarium purpurascens'},
      {label: 'Sphenarium magnum', value: 'Sphenarium magnum'},
      {label: 'Sphenarium histrio', value: 'Sphenarium histrio'},
      {label: 'Melanoplus femurrubrum', value: 'Melanoplus femurrubrum'},
      {label: 'Melanoplus mexicanus', value: 'Melanoplus mexicanus'}
    ]);

    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [items1, setItems1] = useState([
      {label: 'Ninfa', value: 'Ninfa'},
      {label: 'Adulto', value: 'Adulto'}
    ]);
    const [origen, setOrigen] = React.useState({
      latitude : 20.649197, 
      longitude: -100.401855
    })
    const [destino, setdestino] = React.useState({
        latitude : 20.649197, 
        longitude: -100.401855
    })

    const volver = () =>{
        navigation.navigate("MyTabs", {correo})
    }
    
    const Eliminar = () =>{
        if(!claveeliminar){
            ToastAndroid.show('Ingrese una clave', ToastAndroid.SHORT);
            return; 
        }
        fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/bajaTerrario', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `correo=${correo}&clave=${claveeliminar}`,    
        })
        .then(response => response.json())
            
        .then(result => {

          if(result.mensaje== "No se encontro terrario"){
            ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
            setClaveeliminar("");
          }else if(result.mensaje== "Este Terrario no te pertenece"){
            ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
            setClaveeliminar("");
          }else if(result.mensaje== "Terrario eliminado correctamente"){
            ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
            setClaveeliminar("");

          }else if(result.mensaje== "Error al eliminar terrario"){
            ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
            setClaveeliminar("");
            this.serState({
              
            })
          }
              console.log(result)

        })
        .catch(error => {
          // Mostrar mensaje de error
          ToastAndroid.show('Algo salió mal', ToastAndroid.SHORT);
        });
    }
    const Buscar = () =>{
      if(!clavebuscar){
        ToastAndroid.show('Ingrese una clave', ToastAndroid.SHORT);
        return; 
    }
    fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/buscaTerrario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `correo=${correo}&clave=${clavebuscar}`,    
    })
    .then(response => response.json())
        
    .then(result => {
      if (result.mensaje === "No se encontro terrario") {
          ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
      } else if (result.mensaje === "Este Terrario no te pertenece") {
          ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
      } else if (result.mensaje === "Terrario encontrado") {
        console.log(result)
          ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
          setValue(result.terrario.especie);
          setValue1(result.terrario.etapa);
          // Actualiza las coordenadas del marcador destino
          /*setDestino({
              latitude: result.terrario.latitud,
              longitude: result.terrario.longitud
          });*/
      }

  })
    .catch(error => {
      // Mostrar mensaje de error
      ToastAndroid.show('Algo salió mal', ToastAndroid.SHORT);
    });
    }
    const Editar = () =>{
        //http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/editarTerrario

        if (value=== null){
            ToastAndroid.show('Selecciona una especie', ToastAndroid.SHORT);
            return
        }
        if (value1=== null){
            ToastAndroid.show('Selecciona una etapa', ToastAndroid.SHORT);
            return
        }

        fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/editarTerrario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `correo=${correo}&latitud=${destino.latitude}&longitud=${destino.longitude}&especie=${value}&etapa=${value1}&clave=${clavebuscar}`,    
        })
          .then(response => response.json())
              
          .then(result => {
            
 
            if(result.mensaje== "No se encontro terrario"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
                setValue(null)
                setValue1(null)
                setClavebuscar("")
            }else if(result.mensaje== "Este Terrario no te pertenece"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
                setValue(null)
                setValue1(null)
                setClavebuscar("")
            }else if(result.mensaje== "Error al actualizar el Terrario"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
                setValue(null)
                setValue1(null)
                setClavebuscar("")
            }else if(result.mensaje=="Terrario actualizado correctamente"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
                setValue(null)
                setValue1(null)
                setClavebuscar("")
                /*navigation.navigate("MyTabs", {
                  screen: "Terrarios", // Nombre de la pestaña que deseas navegar
                  params: { correo } // Puedes pasar parámetros adicionales si es necesario
                });*/
            }

                console.log(result)

            })
          .catch(error => {
            // Mostrar mensaje de error
            ToastAndroid.show('Hubo un error al insertar terrario', ToastAndroid.SHORT);
          });

        console.log(clavebuscar)
        console.log(value)
        console.log(value1)
        console.log(destino.latitude)
        console.log(destino.longitude)
        console.log(correo)
        
    }

    async function getLocationPermission( ){
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
          alert('permiso denegado')
          return
      }
      let location = await Location.getCurrentPositionAsync({})
      const posActual = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
      }
      setOrigen(posActual)
      setdestino(posActual)
  }

  useEffect(()=>{
      getLocationPermission()
  }, [])
    return(
       <View style={styles.container_sesion}>
       
            <Text style={styles.text}> Editar </Text>

            <View style={styles.buttonContainer}>

                <TextInput
                    style={styles.inputEliminar}
                    placeholder="Clave del Terrario"
                    value={clavebuscar}
                    onChangeText={setClavebuscar}
                />

                <TouchableOpacity
                    onPress={Buscar}
                    style={styles.buttonBuscar}>
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.container_combo3}>
                <DropDownPicker
                    style={styles.inputcombo}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Selecciona una especie"
                    dropDownContainerStyle={styles.dropDownContainer}
                />
            </View>
    
            <View style={[styles.container_combo4, { zIndex: 1 }]}>
                <DropDownPicker
                    style={styles.inputcombo}
                    open={open1}
                    value={value1}
                    items={items1}
                    setOpen={setOpen1}
                    setValue={setValue1}
                    setItems={setItems1}
                    placeholder="Selecciona una etapa"
                    dropDownContainerStyle={styles.dropDownContainer}
                />
            </View>
            <View style={styles.MapDiv1}>
                <MapView
                    style={styles.Map1}
                    initialRegion={{
                        latitude: destino.latitude,
                        longitude: destino.longitude,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5
                    }}
                >
                    <Marker
                        draggable 
                        coordinate={destino}
                        onDragEnd={(direction) => setdestino(direction.nativeEvent.coordinate)}
                    />
                </MapView>
                <Text style={styles.textmap}>Para mover el marcador, dejalo apretado.</Text>
            </View>

            <TouchableOpacity
                    onPress={Editar}
                    style={styles.buttonEditar}>
                    <Text style={styles.buttonText}>Actualizar</Text>
                </TouchableOpacity>

            <Text style={styles.text}> Eliminar </Text>

            <View style={styles.buttonContainer}>

                <TextInput
                    style={styles.inputEliminar}
                    placeholder="Clave del Terrario"
                    value={claveeliminar}
                    onChangeText={setClaveeliminar}
                />

                <TouchableOpacity
                    onPress={Eliminar}
                    style={styles.buttonEliminar}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity
            onPress={volver}
            style={styles.buttonText}>
                <Text style={styles.textBoton}>Volver</Text>
            </TouchableOpacity>
       </View> 
    )
}

export default EditarEliminar;