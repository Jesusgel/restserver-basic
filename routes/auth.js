import express from  'express'
import { check } from 'express-validator';
import { login } from '../controllers/auth_controller.js';
import { validarCampos } from '../middleware/validar_campos.js';


const {Router} = express;



const router = Router();

router.post('/login',[
    check('mail', 'El Correo es obligatorio').isEmail(),
    check('password', 'La Contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);





  export default router;