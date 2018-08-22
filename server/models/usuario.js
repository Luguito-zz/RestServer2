const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'Ingresa Nombre']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Contraseña requerida']
    },
    password: {
        type: String,
        required: [true, 'Email requerido']
    },
    img: {
        type: String,
        required: [false, 'Insertar imagen (Opcional)']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: {
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            message: 'El role ({VALUE}) no existe'
        }
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Ya esta en uso'
});

module.exports = mongoose.model('Usuario', usuarioSchema);