import express from  'express'
import cors from 'cors'

import user from '../routes/user.js'
import auth from '../routes/auth.js'

import { dbConnection } from '../database/config.js';

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
    
        //Conectar a BD
        this.conectarDB();
        
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        // Lectura y Parseo del Body
        this.app.use(express.json());
        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.authPath,auth);
        this.app.use(this.usersPath,user);
    }

    listen(){
        this.app.listen(this.port,()=>{

            console.log('Servidor Corriendo en el puerto', this.port);
          });
    }


}

export default Server