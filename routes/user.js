import express from  'express'
import { check } from 'express-validator';
import { usersGet,usersPost, usersPut,usersPatch, usersDelete } from '../controllers/users_controller.js';
import { esRoleValido, esEmailValido,existeUsuarioPorId} from '../helpers/db-validators.js';
// import { validarJwt } from '../middleware/validarJwt.js';
// import { validarCampos } from '../middleware/validar_campos.js';
// import { isAdminRole, tieneRole } from '../middleware/validar_roles.js';
import {validarJwt,validarCampos,tieneRole} from '../middleware/index.js'

const {Router} = express;



const router = Router();

router.get('/',usersGet);

router.post('/',[
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('password','El password debe ser mas de 6 letras').isLength({min:6}),
  check('mail','El correo no es valido').isEmail(),
  check('mail').custom(esEmailValido),
  // check('role','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('role').custom(esRoleValido),
  validarCampos
],usersPost);

router.put('/:id',[
  check('id','No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('role').custom(esRoleValido),
  validarCampos
],usersPut);

router.patch('/',usersPatch);

router.delete('/:id',[ 
  validarJwt, 
  //isAdminRole,
  tieneRole('ADMIN_ROLE','SUPER_ROLE'),
  check('id','No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
],usersDelete);




  export default router;