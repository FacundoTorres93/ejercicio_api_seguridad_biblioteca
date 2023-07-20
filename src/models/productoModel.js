const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/CasaGamer", {   
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
//Datos de ejemplo (simulando una base de datos)

const productoSchema = new mongoose.Schema({
    nombre: String,
    marca: String,
    precio: Number,
},{collection: 'productos'});

const Producto = mongoose.model('Producto', productoSchema);

module.exports= Producto;