const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = express.response ) => {

    const { email, password } = req.body;

    try {

        // Busca un email en la base de datos con el email que le paso
        let usuario = await Usuario.findOne({ email: email }); 

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }
        
        // Nueva entidad
        usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync(); //Usa 10 por defecto
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );

        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
    
}

const loginUsuario = async(req, res = express.response ) => {

    const { email, password } = req.body;



    try {
        // Busca un email en la base de datos con el email que le paso
        let usuario = await Usuario.findOne({ email: email }); 

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) { // si no es valido entra al if y da error
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecta'
            })
        }

        // Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token: token
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
    


}

const revalidarToken = async(req, res = express.response ) => {
    
    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT( uid, name );


    res.json({
        ok: true,
        uid: uid,
        name: name,
        token: token
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};