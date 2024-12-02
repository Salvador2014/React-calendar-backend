/*  Event Routes
    host + /api/events
*/
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


// traer controladores
const {  getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

//para que todas pasen por una validacion y no tener que ponerlas una a una podemos hacer esto
//osea que todas las peticiones que estan debajo de este validar son validadas
// router.use( validarJWT ); //comento para que quede registro

// Obtener Eventos
router.get(
    '/', 
    validarJWT,
    getEventos
);

// Crear Eventos
router.post(
    '/',
    [
        check('title', 'El titulo es Obligatorio').not().notEmpty(),
        check('start', 'Fecha de inicio es Obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es Obligatoria').custom( isDate ),
        validarCampos
    ],
    validarJWT,
    crearEvento 
);

// Actualizar Evento
router.put('/:id', validarJWT, actualizarEvento );

// Eliminar Evento
router.delete('/:id', validarJWT, eliminarEvento );


module.exports = router;