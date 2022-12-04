const { RolesUser } = require('../models/role')
const { Usuarios } = require('../models/usuario')

const esRolValido = async (rol = '') => {

  const existeRol = await RolesUser.findOne({ rol })
  if (!existeRol) {
    throw new Error(`${rol} no existe`)
  }
}

const emailExiste = async (correo = '') => {
  const existeUsuarioEmail = await Usuarios.findOne({ correo })
  if (existeUsuarioEmail) {
    throw new Error(`${correo} ya registrado`)
    }
  }


  const usuarioPorIdExiste = async ( id = '' ) => {
    const idUsuarioExiste = await Usuarios.findOne({ id })
    if (!idUsuarioExiste) {
      throw new Error(`${id} ya registrado`)
      }
    }



module.exports = {
  emailExiste,
  esRolValido,
  usuarioPorIdExiste
}
