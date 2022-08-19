import {json, query, response} from  'express'
import {User} from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generarJWT.js';
import { googleVerify } from '../helpers/google-verify.js';

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



const googleSignIn = async(req,res=response)=>{
    
    const {id_token} = req.body;

    try {
        const {mail,nombre,img} = await googleVerify(id_token);
         
        let usuario = await User.findOne({mail});
       

        if(!usuario){
            //create
            const data ={
                nombre,
                mail,
                password: ':P',
                img,
                google: true
            };
            
            usuario = new User(data);
            
            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);
       
        res.json({
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        });
    }
}


export {login,googleSignIn}