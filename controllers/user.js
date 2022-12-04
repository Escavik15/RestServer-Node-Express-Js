const { response, request } = require('express')
const bcryptjs = require('bcryptjs') 
const { Usuarios } = require('../models/usuario')




const userGet = async (req = request, res = response) => {
    
    const { limite = 3, desde = 0 } = req.query
    const query = {estado: true }
   
  const [total, usuarios] = await Promise.all([
    Usuarios.countDocuments( query ),
    Usuarios.find( query )
    .skip( Number( desde ) )
    .limit(Number( limite ))
  ])

    res.json({
      total, usuarios
    })
  }
  
const userPost = async (req = request, res = response) => {
 

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuarios({nombre,correo,password,rol})

    //verificar correo

     
      
    //encriptar password

    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync( password , salt)

    //guardar en DB

    await usuario.save()
    res.json({
        msg: 'Post API = controlador Post',
        usuario
    })
  }
  
const userPut = async (req = request, res = response) => {
    const  { id } = req.params
    const {_id, password, google, correo, ...resto} = req.body;

    //ToDo validar contra base de datos
    if( password ){
      //encriptar contraseña
      const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync( password , salt);
    }
    const usuarioDB = await Usuarios.findByIdAndUpdate( id, resto )


    res.json({
        msg: 'Put API = controlador Put',
        usuarioDB
    })
  }
  
const userDelete = async(req = request, res = response) => {
    const {id} = req.params;
    //Fisicamente lo borramos
    //const usuario = await Usuarios.findByIdAndDelete( id );
   const usuario =  await Usuarios.findByIdAndUpdate( id, {estado:false } )


    res.json(usuario)
  }





  module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
  }