const express = require('express')
const cors = require('cors')
const { router } = require('../routes/user');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // coneccion a la base de datos
        this.conectarDB()

        //middlewares
        this.middlewares();

        //rutas de mi aplicacion
        this.routes()
    }
    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use( cors() )
        //Parseo y Lectura del body
        this.app.use(express.json())
        //directorio publico
        this.app.use( express.static('public') )
    }
    routes(){
       this.app.use(this.usuariosPath , router)
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port`, this.port)
          })
    }
}

module.exports={
    Server
}