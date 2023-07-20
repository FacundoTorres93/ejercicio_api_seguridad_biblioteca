const { getAllProductos, createProducto } = require('../../src/controllers/productoController');

const productoModel = require('../../src/models/productoModel');

jest.mock('../../src/models/productoModel');

describe('Producto Controller', ()=>{
    afterEach(() =>{
        jest.clearAllMocks();
    });

    //obtener productos inventados a modo de prueba 
    test('getAllProductos debería obtener todos los productos', async () => {
        const mockProductos = [
            {name: "Producto 1", price: 10},
            {name: "Producto ", price: 20},
        ];

        productoModel.find.mockResolvedValue(mockProductos);

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllProductos(req,res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockProductos);
        expect(productoModel.find).toHaveBeenCalledTimes(1);

    });

    // manejar errores 
    test('getAllProductos debería manejar errores', async () => {
        const errorMessage = "Error al obtener productos";

        productoModel.find.mockRejectedValue(new Error(errorMessage));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllProductos(req,res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: errorMessage});
        expect(productoModel.find).toHaveBeenCalledTimes(1);
});

    // crear producto inventado a modo de prueba
test('createProducto debería crear un nuevo producto', async () => {
    const mockProductoData = {name: 'Nuevo Prodcuto', price: 15};
    const mockSavedProducto = { _id: '1', ...mockProductoData};

    productoModel.create.mockResolvedValue(mockSavedProducto)
    
    const req = { body: mockProductoData};
    const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
};

await createProducto(req,res);

expect(res.status).toHaveBeenCalledWith(201);
expect(res.json).toHaveBeenCalledWith(mockSavedProducto);
expect(productoModel.create).toHaveBeenCalledTimes(1);
expect(productoModel.create).toHaveBeenCalledWith(mockProductoData);
});  
});


