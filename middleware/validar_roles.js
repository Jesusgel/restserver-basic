import { response } from "express"

const isAdminRole = (req,res=response, next) =>{
    
    if(!req.user){
        return res.status(500).json({
            msg: ' Se quiere verificar el role sin validar el token primero'
        });
    }   

    const {role,nombre} = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No tiene Permisos`
        });
    }
    
    
    next();
}


const tieneRole = (...roles) =>{

    return (req,res=response,next) => {

        if(!req.user){
            return res.status(500).json({
                msg: ' Se quiere verificar el role sin validar el token primero'
            });
        } 

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `El Servicio requiere uno de estos roles ${roles}`
            });
        }


        next();
    }

}


export {isAdminRole,tieneRole}