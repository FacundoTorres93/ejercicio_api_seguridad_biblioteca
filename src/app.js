const express = require('express');
const mongoose = require('mongoose');
const { auth } = require('express-oauth2-jwt-bearer'); // autenticacion

const routerProductos = require('./routes/productos');
const errorHandler = require('./middlewares/errorHanddler');


require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {   
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

//Verificador de jwt
const jwtCheck = auth({
    audience: process.env.OAUTH_AUDIENCE,
    issuerBaseURL: process.env.OAUTH_URL,
    tokenSigningAlg: 'RS256'
  });

const app = express();
app.use(express.json());


// Ruta base
app.get(('/'), (res, req)=>{
    res.send('API de productos');
});

//Ruta productos, / jwtCheck lo sacamos por el momento para pasar la pruebra supertest
app.use('/api/productos' , jwtCheck,routerProductos);//middlewares expres antes de la ruta especifica, autenticacion

//Los errores de error handler van al final
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`API de productos escuchando en el puerto ${PORT}`);
});

module.exports = app