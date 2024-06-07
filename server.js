const express = require('express');z
const mysql = require('mysql2');
const cors = require('cors');
const app = express();


// Agregamos la configuración de CORS
app.use(cors());


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Configuración de CSP para permitir las fuentes
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' data:;");
  next();
});

// Creando el pool de conexiones a la base de datos.
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Coloca tu contraseña si tienes una.
  database: 'react',
});

// Habilitamos el uso de req.body para parsear JSON
app.use(express.json());

// Ruta de bienvenida en la raíz del servidor
app.get('/', function (req, res) {
  res.send('Bienvenido a la aplicación React Native con Node.js y MySQL');
});

// Ruta para la inserción de datos (maneja tanto GET como POST)
app.all('/insertarUsuario', function (req, res) {
  if (req.method === 'GET') {
    // Si es una solicitud GET, devolver un mensaje informativo o lo que desees.
    res.send('Ruta de inserción de usuario. Utiliza una solicitud POST para insertar usuarios.');
  } else if (req.method === 'POST') {
    // Si es una solicitud POST, manejar la inserción de usuario.
    const { nombre, apellido, correo } = req.body;
    // Realiza la inserción en la base de datos
    connection.query('INSERT INTO usuario (nombre, apellido, correo) VALUES (?, ?, ?)', [nombre, apellido, correo], function (error, results, fields) {
      if (error) {
        console.error('Error al insertar usuario:', error);
        res.status(500).send({ error: 'Error al insertar usuario en la base de datos' });
      } else {
        res.status(200).send({ success: true, message: 'Usuario insertado exitosamente' });
      }
    });
  } else {
    // Si es otro tipo de solicitud, devolver un código de estado 405 (Method Not Allowed).
    res.status(405).send('Método no permitido en esta ruta.');
  }
});



// Modifica tu ruta /usuario en el servidor para devolver un array de usuarios
app.get('/usuario', function (req, res) {
  // Obteniendo una conexión del pool.
  connection.getConnection(function (err, connection) {
    // Ejecutando la consulta MySQL (seleccionando todos los datos de la tabla 'usuario').
    connection.query('SELECT * FROM usuario', function (error, results, fields) {
      // Si ocurre algún error, lanzamos un error.
      if (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send({ error: 'Error al obtener usuarios de la base de datos' });
      } else {
        // Cambia el envío de la respuesta para devolver un array de usuarios.
        res.json(results);
      }
      // Liberando la conexión al pool.
      connection.release();
    });
  });
});


// Iniciando nuestro servidor.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
