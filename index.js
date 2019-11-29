//npx nodemon para iniciar el servidor
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

const assert = require('assert');


const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));


const url = 'mongodb://localhost:27017';
const dbName = 'products';
const client = new MongoClient(url);
const createRoutes = require('./routes.js');

// conectar el cliente de mongo
client.connect(function(err) {
    // asegurarnos de que no existe un error
    assert.equal(null, err);

    console.log('conexión');    

    // conectamos el cliente a la base de datos que necesitamos
    const db = client.db(dbName);

    createRoutes(app, db);
});



app.listen(PORT,()=>console.log('Server funcionando en el puerto '+PORT))