const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificaToken, verificaRole } = require('../middlewares/autenticacion');



app.get('/usuario', [verificaToken, verificaRole], function(req, res) {

    let desde = Number(req.query.desde || 0);
    let limite = Number(req.query.limite || 5);

    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({}, (err, cuantos) => {
                res.json({
                    ok: true,
                    usuarios,
                    RegistroTotal: cuantos
                })
            })

        })
})

app.post('/usuario', [verificaToken, verificaRole], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuariodb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        //usuariodb.password = null;

        res.json({
            ok: true,
            usuario: usuariodb
        })

    })
})

app.put('/usuario/:id', [verificaToken, verificaRole], function(req, res) {

    let id = req.params.id

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuariodb) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuariodb
        });

    })


})

app.delete('/usuario/:id', [verificaToken, verificaRole], function(req, res) {

    let id = req.params.id;
    let estado = _.pick(req.body, ['estado']);

    Usuario.findByIdAndUpdate(id, estado, { new: true }, (err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuarioDB
        })

    })


})

module.exports = app