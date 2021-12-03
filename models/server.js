import express from  'express'
import cors from 'cors'

import user from '../routes/user.js'

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';

        this.middlewares();
        this.routes();
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
        this.app.use(this.usersPath,user);
    }

    listen(){
        this.app.listen(this.port,()=>{

            console.log('Servidor Corriendo en el puerto', this.port);
          });
    }


}

export default Server