const express = require('express');
const mysql = require('mysql');





/*
// configuracion local de base datos
const conexion = mysql.createConnection({ 
  //llamaos la variebles de env
  connectionLimit: 500,
host:  process.env.DB_HOST ,
user:  process.env.DB_USER ,
port: 3306,
password: process.env.DB_PASSWORD,
database:process.env.DB_DATABASE

});
conexion.connect(function(err) {
  if (err) throw err;
  console.log("Conexion de Servidor exitosa!");
  
});*/

//conexion de base datos en servidor
const conexion = mysql.createPool({
  connectionLimit: 500,
host:  process.env.DB_HOST ,
user:  process.env.DB_USER ,
port: 3306,
password: process.env.DB_PASSWORD,
database:process.env.DB_DATABASE
});

if(conexion){
  console.log("Conexion de Servidor exitosa!");
}
else{
  console.log("Conexion de Servidor erorr!");
}


module.exports = conexion;
