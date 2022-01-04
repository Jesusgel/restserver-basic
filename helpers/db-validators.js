
import { Role } from "../models/role.js";
import { User } from "../models/user.js";

const esRoleValido= async(rol='') =>{
   
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
  }
const esEmailValido = async(mail='') => {
      
       const existeEmail =  await User.findOne({mail});
        if(existeEmail){
            throw new Error(`EL correo: ${mail}, ya esta registrado`);
        }
            
    };

    const existeUsuarioPorId = async(id) => {
      
      const existeUsuario =  await User.findById(id);
       if(!existeUsuario){
           throw new Error(`EL ID ${id} no existe`);
       }
           
   };




  export {esRoleValido,esEmailValido,existeUsuarioPorId};