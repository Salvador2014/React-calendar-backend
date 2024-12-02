const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {
    
    return new Promise( (resolve, reject) => {
        
        const payload = { uid, name };
        
        // aca hacemos la firma del token, le paso el paylod la clave privada en los ENV y la expiracion del token
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            //si todo sale bien hace el token y lo resuelve
            resolve( token );
        });
    }) 

}

module.exports = {
    generarJWT
}