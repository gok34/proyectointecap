const mysql = require('mysql');
const conexion = mysql.createConnection({ 
  //llamaos la variebles de env
  connectionLimit: 500,
host:  process.env.DB_HOST ,
user:  process.env.DB_USER ,
port: 3306,
password: process.env.DB_PASSWORD,
database:process.env.DB_DATABASE,
debug: false,
    multipleStatements: true
});

conexion.connect((error)=>{
if(error){
  console.error('error al conectar BD'+error);
  return
}
 console.log('se conecto con exito');


})
module.exports = conexion;