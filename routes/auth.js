/*  Rutas de Usuarios / Auth
    host + /api/auth
*/
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

// traer controladores
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    '/new', 
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(), //tiene que ser obligatortio y no debe de estar vacio
        check('email', 'El email es obligatorio').isEmail(), //tiene que ser obligatortio y no debe de estar vacio
        check('password', 'El password es obligatorio').isLength({ min: 6 }), //tiene que ser obligatortio y no debe de estar vacio
        validarCampos
    ],
    crearUsuario );

router.post(
    '/',
    [ //middlewares
        check('email', 'El email es obligatorio').isEmail(), //tiene que ser obligatortio y no debe de estar vacio
        check('password', 'El password es obligatorio').isLength({ min: 6 }), //tiene que ser obligatortio y no debe de estar vacio
        validarCampos
    ], 
    loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;