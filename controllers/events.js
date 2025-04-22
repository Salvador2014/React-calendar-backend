const express = require('express');
const Evento = require('../models/Evento');


const getEventos = async(req, res = express.response ) => {

    try {

        const eventos = await Evento.find()
                                    .populate('user', 'name'); //es como el contain trae user y selecciono solo el name
        
        res.status(201).json({
            ok: true,
            eventos: eventos
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
    


}

const crearEvento = async(req, res = express.response ) => {

    try {
        const evento = new Evento( req.body );

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
    
}


const actualizarEvento = async(req, res = express.response ) => {

    try {

        const eventoId = req.params.id;
        const uid = req.uid;

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                id: 'El evento no existe por ese ID'
            });
        }

        if ( evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                id: 'no tiene privilegio para editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );
 
        res.json({
            ok: true,
            evento: eventoActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
    
}

const eliminarEvento = async(req, res = express.response ) => {

    try {

        const eventoId = req.params.id; //id del evento
        const uid = req.uid; //id del usuario

        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                id: 'El evento no existe por ese ID'
            });
        }

        if ( evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'no tiene privilegio para eliminar este evento'
            });
        }


        await Evento.findByIdAndDelete( eventoId );
 
        res.json({
            ok: true,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
    
}



module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};