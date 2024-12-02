const express = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = express.response, next) => {

    // x-token headers

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    
    try {

        // Pide el token y la key secreta de los env
        // Esto es para verificar que no se vencieron las 2hs y si se cambio el token, etc osea lo verifica
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = payload.uid;  
        req.name = payload.name;        

    } catch (error) {

        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })

    }

    next();
    
}

module.exports = {
    validarJWT
}

