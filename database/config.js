const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
         await mongoose.connect( process.env.DB_CNN );
        
        // await mongoose.connect( process.env.DB_CNN, {
        //     useNewUrlParser: true, 
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });


        console.log('DB Online');


    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de inicializarla DB");
        
    }
}

module.exports = {
    dbConnection
}