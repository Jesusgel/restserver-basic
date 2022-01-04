import {query, response} from  'express'
import bcryptjs from 'bcryptjs';
import {User} from '../models/user.js';



   const usersGet = async(req,res= response) => {
        
        const {limite =5, desde = 0} = req.query;

        // const usuarios = await User.find({estado: true})
        //     .skip(Number(desde))
        //     .limit(Number(limite));

        // const total = await User.countDocuments({estado: true});

       const [total,usuarios] = await Promise.all([
            User.find({estado: true}),
            User.countDocuments({estado: true})
        ]);

        res.json(
            {
                total,
                usuarios
            });
    }

    const usersPost = async(req,res= response) =>{


     
            const {nombre,mail,password,role} = req.body;
            const user = new User({nombre,mail,password,role});

            //Verificar si el correo existe

            //Encriptar la contraseña
            const salt =bcryptjs.genSaltSync();
            user.password = bcryptjs.hashSync(password,salt);
    
            await user.save();

            res.json({
                user
            });
    }

    const usersPut =  async(req,res= response) => {

        const {id} = req.params;
        const {password,google,mail,...resto} = req.body;

        // TODO Validar contra BD
        if(password){
           
            const salt =bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password,salt);

        }

        const usuario = await User.findByIdAndUpdate(id, resto);
  

        res.json(
            usuario
        );
    }



    const usersPatch = (req,res= response) => {
        
            res.json({
            msg: 'PATCH API - Controller'
            });
    }

    const usersDelete = async(req,res= response) => {

        const {id} = req.params;

        // Fisicament se borra
        // const usuario = await User.findByIdAndDelete(id);

        const usuario = await User.findByIdAndUpdate(id,{estado : false});

        res.json(usuario);

    }


export {usersGet , usersPost, usersPut,usersPatch, usersDelete}