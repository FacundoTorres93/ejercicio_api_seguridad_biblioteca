const request = require('supertest');
const app = require('../../src/app');

test('Obtener lista de productos', async () =>{
    const response = await request(app).get('/api/productos');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(10);
});

test('Crear un nuevo producto', async () =>{
    const nuevoProducto = { nombre: 'Luces led', marca: 'Vision', precio: 5500};

    const response = await request(app)
    .post('/api/productos')
    .send(nuevoProducto);

    expect(response.statusCode).toBe(201);
    expect(response.body.nombre).toBe('Luces led');
});