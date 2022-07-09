const { Router } = require('express');
const { 
        usuariosGet, 
        usuarioPost, 
        usuarioPut, 
        usuarioDelete 
      } = require('../constrollers/users');


const router = Router();


router.get('/', usuariosGet)

router.post('/', usuarioPost)

router.put('/:id', usuarioPut)

router.delete('/', usuarioDelete)


module.exports = router;