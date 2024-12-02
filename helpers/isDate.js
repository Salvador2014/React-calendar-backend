const moment = require("moment");


const isDate = ( value ) => {

    if ( !value ) {
        return;
    }
    
    //pasa a formato fecha el value y se fija si es fecha o no
    const fecha = moment( value );
    if ( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }

  
}

module.exports = { 
    isDate
};