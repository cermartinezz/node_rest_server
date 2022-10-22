const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/requestValidate');

const router = Router();

router.post('/login',[
  check('email', 'The email is required').notEmpty(),
  check('email', 'The email is not valid').isEmail(),
  check('password', 'The password is required').notEmpty(),
  validateFields
], login);

router.post('/google',[
  check('id_token', 'The id token is required').notEmpty(),
  validateFields
], googleSignIn);


module.exports = router;