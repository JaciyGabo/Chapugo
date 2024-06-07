import React from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from './styles';


const Validacion = () => {
    const navigation = useNavigation();
    return (
    <ImageBackground
        source={require('./img/fondo_espera.png')}
        style={styles.backgroundImage}>
        <View style={styles.overlay}>
            <Text style={styles.text2}
               onPress={() => navigation.navigate("Login")}>Esperando a un administrador</Text>
            <Text style={styles.text3}
               onPress={() => navigation.navigate("Login")}>Un administrador se pondra en contacto con usted para validar la activación de su cuenta </Text>
        </View>
    </ImageBackground>
    );
}


export default Validacion;