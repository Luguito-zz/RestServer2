//=================================
//          PUERTO
//=================================

process.env.PORT = process.env.PORT || 3000;

//=================================
//          ENTORNO
//=================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//=================================
//          PUERTO
//=================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe1';
} else {

    urlDB = 'mongodb://cafe-user:123456A@ds227352.mlab.com:27352/cafe1';
}

process.env.URLDB = urlDB