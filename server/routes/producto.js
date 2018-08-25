const express = require('express');
let { verificaToken } = require('../middlewares/autenticacion');

const Producto = require('../models/producto');
let app = express();

//==================================
//     Mostrar todos los Productos
//==================================
//Paginado
//Populate

app.get('/producto', (req, res) => {

    let limite = Number(req.query.limite || 5);

    Producto.find({})
        .sort('nombre')
        .limit(limite)
        .populate('usuario', 'nombre')
        .populate('categoria', 'titulo')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }


            Producto.count({}, (err, cuantos) => {
                res.json({
                    ok: true,
                    productos,
                    RegistroTotal: cuantos
                })
            })
        });

});

//==================================
//      Buscar Productos
//==================================

app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'titulo')
        .exec((err, productos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            });
        })


})


//==================================
//     Mostrar los Productos by ID
//==================================
//Populate

app.get('/producto/:id', (req, res) => {

    let id = req.params.id;

    Producto.findById(id)
        .sort('nombre')
        .populate('Categoria', 'Usuario')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });
});

//==================================
//      Crear un Producto
//==================================
//Usuario
//Categoria Permitidas

app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;

    let productos = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        categoria: body.categoria,

    })

    productos.save((err, productosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se pudo guardar el producto en la base de datos'
                }
            });
        };

        res.json({
            ok: true,
            productos: productosDB
        });

    });


});



//==================================
//      Actualizar un Producto
//==================================
//Usuario
//Categoria Permitida

app.put('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, { new: true }, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });

    });


})


//==================================
//      Eliminar un Producto
//==================================
//Boleean : false.


app.delete('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let estado = req.body;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'El producto ya no esta disponible'
            })
        })

    })

})

module.exports = app;