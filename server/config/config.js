//=================================
//          PUERTO
//=================================

process.env.PORT = process.env.PORT || 3000;

//=================================
//          ENTORNO
//=================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//=================================
//        BASE DE DATOS
//=================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe1';
} else {

    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB

//=================================
//     VENCIMIENTO DEL TOKEN
//=================================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//=================================
//            SEED
//=================================


process.env.SEED = process.env.SEED || 'ELPINACULO';



//=================================
//      Google Client ID
//=================================


process.env.CLIENT_ID = process.env.CLIENT_ID || '729516143969-mls6vjl1gi77slb47n7slpa1k5iiur0i.apps.googleusercontent.com';