import {query, response} from  'express'
import {User} from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generarJWT.js';

const login = async(req,res = response) =>{


    const {mail,password} = req.body;

    try {

        // Verificar si email existe
        const usuario = await User.findOne({mail});
        if(!usuario){
            return res.status(400).json({
                msg : 'Usuario / Password no son correctos -correo'
            });
        }
        // Si el usuario esta activo 
        if(!usuario.estado){
            return res.status(400).json({
                msg : 'Usuario / Password no son correctos -estado false'
            });
        }
        //verificar contraseña
        const validarPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg : 'Usuario / Password no son correctos -estado password'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({

            msg: 'Login OK',
            usuario,
            token
        });

    } catch (error) {
        return res.status(500).json(
            { msg: 'Hable con el administrador'
        });
    }


}


export {login}