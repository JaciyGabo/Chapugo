import  React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Button, StyleSheet, ToastAndroid, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import MapView, {Marker, Polyline} from "react-native-maps";
import * as Location from 'expo-location'
import styles from './styles';
import ip from "./ip";
import DropDownPicker from 'react-native-dropdown-picker';


const AltaTerrario = ({ route }) => {
    const navigation = useNavigation();
    const { correo } = route.params || {};
    const [origen, setOrigen] = React.useState({
        latitude : 20.649197, 
        longitude: -100.401855
    })
    const [destino, setdestino] = React.useState({
        latitude : 20.649197, 
        longitude: -100.401855
    })
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
    const Agregar = () => {
        if (value=== null){
            ToastAndroid.show('Selecciona una especie', ToastAndroid.SHORT);
            return
        }
        if (value1=== null){
            ToastAndroid.show('Selecciona una etapa', ToastAndroid.SHORT);
            return
        }

        fetch('http://dtai.uteq.edu.mx/~jacqui209/servicios/webservice/back/altaTerrario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `correo=${correo}&latitud=${destino.latitude}&longitud=${destino.longitude}&especie=${value}&etapa=${value1}`,    
        })
          .then(response => response.json())
              
          .then(result => {
            
 
            if(result.mensaje== "Terrario insertado correctamente"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
                setValue(null)
                setValue1(null)

            }else if(result.mensaje== "Error al insertar el Terrario"){
                ToastAndroid.show(result.mensaje, ToastAndroid.SHORT);
                setValue(null)
                setValue1(null)
            }

                console.log(result)

            })
          .catch(error => {
            // Mostrar mensaje de error
            ToastAndroid.show('Hubo un error al insertar terrario', ToastAndroid.SHORT);
          });

    } 

    const Eliminar = () => {
        navigation.navigate("EditarEliminar", {correo})
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
    
    return (
        <View style={styles.container_sesion}>
            <Text style={styles.text}>Agregar un Terrario</Text>
            <View style={styles.container_combo1}>
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
    
            <View style={[styles.container_combo2, { zIndex: 1 }]}>
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
        
            <View style={styles.MapDiv}>
                <MapView
                    style={styles.Map}
                    initialRegion={{
                        latitude: destino.latitude,
                        longitude: destino.longitude,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5
                    }}
                >
                    <Marker
                        draggable 
                        coordinate={origen}
                        onDragEnd={(direction) => setdestino(direction.nativeEvent.coordinate)}
                    />
                </MapView>
                <Text style={styles.textmap}>Para mover el marcador, dejalo apretado.</Text>
            </View>
    
            <TouchableOpacity
            onPress={Agregar}
            style={styles.button1} >
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={Eliminar}
            style={styles.buttonText} >
                <Text style={styles.textBoton}>Borrar/Eliminar</Text>
            </TouchableOpacity>
        </View> 
    );
    
}

export default AltaTerrario;