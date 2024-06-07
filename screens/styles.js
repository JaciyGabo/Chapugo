// styles.js

import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3FFFD',
    },
    container_sesion: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3FFF3',
    },
    container_text: {
        alignSelf: 'center', // Centra horizontalmente dentro del contenedor
        position: 'absolute',
        top: 0,
        left: 0,
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5E8194',
    },
    container_combo1: {
        width: 300,
        marginBottom:5,  
    },
    container_combo2: {
        width: 300,
        marginBottom:15,  
    },
    container_combo3: {
        width: 300,
        marginBottom:0,  
    },
    container_combo4: {
        width: 300,
        marginBottom:0,  
    },
    container_terrario: {
    
        width:"100%",
        
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B5FAB6',
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 15, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3, 
        elevation: 5, 
        marginTop:30
    },
    chart: {
        width: 300,
        height: 200
      },
      
    inputcombo: {
        marginVertical: 10, 
        padding: 10, 
        backgroundColor: '#fff', 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 15, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3, 
        elevation: 5, 
      },
      dropDownContainer: {
        borderColor: '#ccc', 
        padding: 12, 
        borderRadius: 15, 
        backgroundColor: 'white', 
        
    },
    Map: {
        width: 250,
        height: 300,
        
    },
    MapDiv: {
        width: 300,
        height: 380,
        borderWidth: 1,
        borderColor: '#469774',
        borderRadius: 10,
        backgroundColor: '#5D97FA55',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Map1: {
        width: 250,
        height: 250,
        
    },
    MapDiv1: {
        width: 300,
        height: 330,
        borderWidth: 1,
        borderColor: '#469774',
        borderRadius: 10,
        backgroundColor: '#5D97FA55',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textmap:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#01847C',
        textAlign: "center",
        marginTop: 15
    },
    buttonContainer: {
        flexDirection: 'row', // Alinea los elementos en una fila
        justifyContent: 'space-between', // Distribuye el espacio entre los elementos
        paddingHorizontal: 0, 
        marginBottom:5// Espacio horizontal alrededor de los botones

    },

    button: {
        backgroundColor: '#01847C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 50,
        marginEnd: 10
    },
    buttonterrario: {
        backgroundColor: '#4D734E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 15,
        marginBottom: 1,
    },
    button1: {
        backgroundColor: '#01847C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginTop: 20,
        marginEnd: 10
    },
    buttonn: {
        backgroundColor: "#a31f1add",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 50,
        marginEnd: 10
    },
    buttonnn: {
        backgroundColor: "#2B5DA2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 50,
        marginEnd: 10
    },
    button_sesion: {
        backgroundColor: "#2B5DA2",
        width:200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 1
    },
    button_cerrarsesion: {
        backgroundColor: "#a31f1add",
        width:200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 1
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#01847C',
        marginBottom: 20,
    
    },
    text_conta: {
        fontSize: 25,
        color: '#fff',
        marginTop: 40,
        textAlign: 'center',
        marginHorizontal: 30
    
    },
    text2: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#005E58',
        marginBottom: 20,
        textAlign: "center",
        marginStart: 15,
        marginEnd: 15
    
    },
    text22: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#005E58',
        textAlign: "center",
        marginEnd: 15,
        textAlignVertical: 'center', 
    
    },
    text3: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#01847C',
        marginBottom: 20,
        textAlign: "center",
        marginStart: 20,
        marginEnd: 20
    
    },
    textBoton:{
        fontSize: 20,
        color: '#000', 
        alignSelf: 'flex-start', 
        marginTop: 15,

    },
    textInput: {
        fontSize: 20,
        color: '#01847C', 
        alignSelf: 'flex-start', 
        marginBottom: 5,
        marginStart: 50
    },

    textInputTop: {
        fontSize: 20,
        color: '#01847C',
        marginRight: 200,
        marginTop: 50,
    },
    textflat: {
       marginTop: 100
    },
    textterrarioTitulo: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#4D734E',
        marginBottom: 20,
    
    },
    textterrarioH1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#01847C',
        marginBottom: 10,
        textAlign: "center",
    
    },
    textterrarioH2: {
        fontSize: 18,
        color: '#01847C',
        marginBottom: 10,
        textAlign: "center",
    
    },
      input: {
        marginBottom: 0,
        width: '75%',
        padding: 8,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 20,
        fontSize: 20,
        marginBottom: 10
      },
      inputEliminar: {
        marginBottom: 0,
        width: '50%',
        height: 45,
        padding: 8,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 20,
        fontSize: 20,
      },
      buttonEliminar: {
        backgroundColor: '#a31f1add',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginStart: 15,
    },

    buttonEditar: {
        backgroundColor: '#2B5DA2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom:10,
        marginTop:15,
    },
    buttonBuscar: {
        backgroundColor: '#01847C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginStart: 15,
    },
      item: {
        padding: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
      },
      item: {
        padding: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
      },



    buttonText: {
        textAlign:"center",
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Puedes ajustar esto según tus necesidades
        justifyContent: 'center', // Puedes ajustar esto según tus necesidades
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Ajusta el color y la opacidad del fondo
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

    /*scroll: {   
        flex: 1,
        backgroundColor: '#DCFCFA',
    },
        texttop: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#01847C',
        marginBottom: 20,
        marginTop: 50,
    },
    textbotom: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'rgb(255, 148, 41)',
        marginBottom: 50,
        marginTop: 50,
    },
    margen: {
        marginBottom: 0
    },*/

});

export default styles;
