const express = require('express');
const route = express.Router();

const ProductoController = require('../controllers/productoController');

const { requiredScopes } = require('express-oauth2-jwt-bearer'); // autorizacion

route.get('/', ProductoController.getAllProductos); // , requiredScopes('read:productos') lo sacamos solo para hacer la prueba supertest

//Obtener productos por ID
route.get('/:id', ProductoController.getProductoById); // , requiredScopes('read:productos'), idem

//Crear un nuevo producto
route.post('/', ProductoController.createProducto); // requiredScopes(['read:productos' , 'write:productos'])

//Actualizar un producto existente
route.put('/:id', requiredScopes(['read:productos' , 'write:productos']), ProductoController.updateProductoById);

//Eliminar un productos
route.delete('/:id', requiredScopes('write:productos', ProductoController.deleteProductoById));

module.exports = route;


