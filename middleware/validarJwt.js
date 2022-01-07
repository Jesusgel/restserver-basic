import { response } from "express"
import  jwt  from "jsonwebtoken"
import { User } from "../models/user.js";

const validarJwt = async (req,res=response,next) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const  {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        
        const user = await User.findById(uid);
        if(!user){
            return res.status(401).json({
                msg: 'Token no valido - usuario no Existe'
            });
        }

        if(!user.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado  FALSE'
            });
        }

        req.user = user;


        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ 
            msg: 'token no valido' 
        });
    }

  

}

export {validarJwt};