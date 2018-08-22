const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
require('./config/config');

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

app.use(require('./routes/index'))


mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    //'mongodb://cafe-user:123456A@ds227352.mlab.com:27352/cafe1'
    if (err) throw err;

    console.log("Base de datos ONLINE");

})


app.listen(process.env.PORT || 3000, () => {
    console.log('Escuchando el puerto 3000');
})