const express = require('express');
const app= express();
const puerto= process.env.PORT || 3000;
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');




//2.---caputra de valor por medio de express
app.use(express.urlencoded({extends:false}));
//definimos el trabajar json
app.use(express.json());

//3---creamos para apuntar archivos env
dotenv.config({path:'./env/.env'});

//4 --- setear el ppublic 
app.use('/resources',express.static('public'));
app.use('/resources',express.static(__dirname+'/public'));


//5----motor de p plantillas
app.set('view engine','ejs');

//6-- bycryo

//.7 var session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true

}))

//8-- 

app.use('/', require('./router'));

//escuchado el puerto 5000
app.listen(puerto,(req, res)=>{
console.log ('server correndo en puerto 5000');
});