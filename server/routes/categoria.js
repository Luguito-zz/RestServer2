const express = require('express');

let { verificaToken, verificaRole } = require('../middlewares/autenticacion');

let app = express();

const Categoria = require('../models/categoria');


//==================================
// Mostrar todas las Categorias
//==================================

app.get('/categoria', (req, res) => {

    Categoria.find({})
        .sort('titulo')
        .populate('usuario', 'nombre')
        .skip()
        .limit()
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.count({}, (err, cuantos) => {
                res.json({
                    ok: true,
                    categorias,
                    RegistroTotal: cuantos
                });
            });

        });

});

//=================================
// Mostrar Categoria por ID
//=================================

app.get('/categoria/:id', (req, res) => {

    let id = req.params.id;

    Categoria.findById(id)
        .exec((err, categoriaDB) => {
            if (err) {
                return res.json(400).json({
                    ok: false,
                    err: {
                        message: 'Categoria no encontrada'
                    }
                });
            }

            res.json({
                ok: true,
                categoria: categoriaDB

            })
        })

})


//=================================
//  Crear una Categoria
//=================================


app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categorias = new Categoria({
        titulo: body.titulo,
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categorias.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se ha podido guardar la categoria'
                }
            });
        };

        res.json({
            ok: true,
            categorias: categoriaDB
        });
    });

});

//=================================
//  Actualizar Categoria   
//=================================

app.put('/categoria/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Categoria.findByIdAndUpdate(id, body, { new: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });


})

//=================================
//  Eliminar Categoria
//=================================


app.delete('/categoria/:id', [verificaToken, verificaRole], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se ha podido eliminar la categoria'
                }
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no se ha encontrado'
                }
            })
        }

        res.json({
            ok: true,

            message: 'Categoria eliminada'
        })
    });

})


module.exports = app;