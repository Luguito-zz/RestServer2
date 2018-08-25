const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Categoria = new Schema({

    descripcion: {
        type: String,
        unique: true,
        required: [true, 'Es necesario agregar una descripcion']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    titulo: {
        type: String,
        unique: false,
        required: [true, 'Ingresa un titulo para la categoria']
    },

});

module.exports = mongoose.model('Categoria', Categoria);