import {query, response} from  'express'


   const usersGet = (req,res= response) => {
        
        const query = req.query;
        res.json({
        msg: 'GET API - Controller',
        query
        });
    }

    const usersPost = (req,res= response) =>{
     
            const {nombre,edad,nacionalidad} = req.body;
    
            res.json({
                msg: 'POST API - Controller',
                nombre,
                edad,
                nacionalidad
            });
    }

    const usersPut = (req,res= response) => {

        const id = req.params.id;
        res.json({
        msg: 'PUT API - Controller',
        id
        });
    }



    const usersPatch = (req,res= response) => {
        
            res.json({
            msg: 'PATCH API - Controller'
            });
    }

    const usersDelete = (req,res= response) => {

        res.json({
        msg: 'DEL API - Controller'
        });
    }


export {usersGet , usersPost, usersPut,usersPatch, usersDelete}