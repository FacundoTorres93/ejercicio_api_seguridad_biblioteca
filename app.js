const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');

const routerProductos = require('./routes/productos')
const errorHandler = require('./middlewares/errorHanddler')

//Verificador de jwt
const jwtCheck = auth({
    audience: 'https://localhost:3000/api/productos',
    issuerBaseURL: 'https://dev-awhhrop25tjxku0v.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

const app = express();

app.use(express.json());

//Validad en todo las rutas 
//app.use(jwtCheck); //middlewares expres, tiene que estar antes de las rutas

//Ruta base
app.get(('/'), (res, req)=>{
    res.send('API de productos');
});

//Ruta productos
app.use('/api/productos', jwtCheck ,routerProductos);//middlewares expres antes de la ruta especifica, autenticacion

//Los errores de error handler van al final
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`API de productos escuchando en el puerto ${PORT}`);
});