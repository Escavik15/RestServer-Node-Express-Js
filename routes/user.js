const { Router } = require('express')
const { userGet, userPost, userPut, userDelete } = require('../controllers/user')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { esRolValido, emailExiste, usuarioPorIdExiste } = require('../helpers/db-validators')

const router = Router()


router.get('/', userGet)
router.put('/:id',[
  check('id', 'no es un id valido').isMongoId(),
  check('id').custom(usuarioPorIdExiste),
  check('rol').custom( esRolValido )
  ,validarCampos]
, userPut )
router.post('/', 
[check('correo').custom(emailExiste).isEmail(), 
check('nombre', 'El nombre es obligatorio').not().isEmpty(),
check('password', 'El password es obligatorio').isLength({ min: 6 }),
check('rol').custom( esRolValido ),
validarCampos ],
 userPost )
router.delete('/:id',[
  check('id', 'no es un id valido').isMongoId(),
  check('id').custom(usuarioPorIdExiste),
  validarCampos
], userDelete)

  module.exports = {
    router
  }