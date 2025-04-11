const path = require('path');
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
var cors = require('cors');



// Crear el servidor de express
const app = express();

// Base de datos

dbConnection()

// CORS
app.use(cors())



// Directorio Publico
//si pasa por aca entra si o si a public->index.html
app.use( express.static('public') );


//Lectura y parseo del body
app.use( express.json() );





// // Rutas
//Todo lo que ./routes/auth exporte lo habilite en la ruta /api/auth
app.use('/api/auth', require('./routes/auth' )); //TODO: auth //crear, login, token
app.use('/api/events', require('./routes/events' )); // todo lo de eventos


app.use('*', (req, res) => {
    res.sendFile( path.join( __dirname, 'public/index.html'));
});


//TODO: CRUD: Eventos






// Escuchar peticiones

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ 4000 }`);
});
