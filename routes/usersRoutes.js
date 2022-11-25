const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/requestValidate');


const { 
        usuariosGet, 
        usuarioPost, 
        usuarioPut, 
        usuarioDelete 
      } = require('../controllers/userController');
const { roleExist, emailExist, userExist } = require('../helpers/validators');
const { validateToken, hasRole, isAdmin } = require('../middlewares');


const router = Router();


router.get('/', usuariosGet)

router.post('/', [
  validateToken,
  check('name', 'The name is mandatory').notEmpty(),
  check('password', 'The password is mandatory').notEmpty(),
  check('password', 'The password must have more than 6 letters').isLength(6),
  check('email', 'The email is not valid').isEmail(),
  check('email').custom(emailExist),
  // check('role', 'Not a valid role').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('role').custom(roleExist),
  validateFields
], usuarioPost)

router.put('/:id',[
  validateToken,
  check('id','Not a valid id').isMongoId(),
  check('id').custom(userExist),
  validateFields
], usuarioPut)

router.delete('/:id',
[
  validateToken,
  isAdmin,
  hasRole('ADMIN_ROLE','SALES_ROLE'),
  check('id','Not a valid id').isMongoId(),
  check('id').custom(userExist),
  validateFields
]
, usuarioDelete)


module.exports = router;