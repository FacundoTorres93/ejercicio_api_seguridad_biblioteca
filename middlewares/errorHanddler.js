//administrar los errores de express
const errorHandler = (err, req, res, next) => {
    ///Verificar si el error tiene un  dodigo de estado definido, de lo contrario, establecer el codigo de estado
    const statusCode= err.statusCode || 500;

    //Construid objeto de respuesta de error
    const errorResponse = {
        error: {
            message: err.message || 'error interno en el servidor',
            code: err.code || 'internal_error'
        },
    };

    //Enviar respuesta de error en formato JSON
    res.status(statusCode).json(errorResponse);
}

module.exports = errorHandler;