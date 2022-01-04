import  mongoose from 'mongoose'

const dbConnection  = async() =>{
    try {
       
       await mongoose.connect(process.env.MONGODB);

        console.log('Base de Datos ONLINE');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la Base de Datos');
    }
    

}

export {dbConnection}