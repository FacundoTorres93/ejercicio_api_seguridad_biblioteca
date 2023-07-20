const Producto = require('../models/productoModel');


//obtener todos los productos
exports.getAllProductos = async (req, res) => {
    try {
        const products = await Producto.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener productos'})
    }
};

//obtener productos por ID
exports.getProductoById = async (req, res) => {
    try {
        const product = await Producto.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener producto'})
    }
};

//Crear un nuevo productos
exports.createProducto = async (req, res) => { // read:productos sin acceso
    try {
        const newProducto = await Producto.create(req.body);
        res.status(201).json(newProducto);
    } catch (error) {
        res.status(500).json({error: 'Error al crear producto'})
    }
};

// Actualizar un producto existente por id
exports.updateProductoById = async (req, res) => { // read:productos sin acceso
    try {

        const updateProdcuto = await Producto.findByIdAndUpdate(req.params.id,
                req.body, {
                    new: true
                });

            if (!updateProdcuto) {
                return res.status(404).json({
                    error: 'Producto no encontrado'
                })
            }
        res.status(200).json(updateProdcuto);
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar producto'})
    }
};

//Eliminar un producto por id 
exports.deleteProductoById = async (req, res) => { // read:productos sin acceso
    try {

        const deleteProducto = await Producto.findByIdAndDelete(req.params.id)

        if (!deleteProducto) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }
        res.status(200).json(deleteProducto);
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar producto'})
    }
};