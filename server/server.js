const express = require('express');
const app = express();
const bodyParse = require('body-parser');


//=========================================
//Parse application/x-www-form-urlenconded
//=========================================

app.use(bodyParse.urlencoded({ extended: false }))

//=========================================
//Parse application/Json
//=========================================

app.use(bodyParse.json())

//==========================================
//              Requests
//==========================================


app.get('/usuario', function(req, res) {
    res.json('Get Usuario');
})

app.post('/usuario', function(req, res) {

    let body = req.body;

    res.json({
        Usuario: body
    });

})

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id

    res.json({
        id
    });
})

app.delete('/usuario', function(req, res) {
    res.json('Delete funcionando');
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Escuchando el puerto 3000');
})