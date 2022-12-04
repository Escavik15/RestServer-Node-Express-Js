

const { Schema, model } = require('mongoose')

const RolesSchema = Schema({
    rol: {
        type: String,
        required : [true, 'el rol es obligatorio']
    }


})



const RolesUser = model('Role', RolesSchema)


module.exports = {
    RolesUser
}