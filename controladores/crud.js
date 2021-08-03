const conexion = require('../basedatos/conexion');
const controller = {};
const bcryptjs = require('bcryptjs');


//loguin
exports.loguin = (req, res) => {
    
  
           res.render('login');
        };


//validez de loguin
exports.validarcorreo = (req, res) => {
    const correo=req.body.correo;
    const contraseña=req.body.psw;
    
      console.log(correo);
      if(correo && contraseña){
        conexion.query('sELECT usuarios.usuario_id,usuarios.nombre,usuarios.apellido,usuarios.telefono,usuarios.direcion,usuarios.correo,usuarios.rol_id,roles.nombre_rol,usuarios.contraseña FROM usuarios INNER JOIN roles ON usuarios.rol_id = roles.Rol_id where  usuarios.correo=?',[correo],(error,resultado)=>{
            if(resultado==0 || !bcryptjs.compareSync(contraseña,resultado[0].contraseña) ){
             //res.send(crypto.Decipher.update(resultado[0].contraseña));
             res.render('login',{
                    alert:true,
                    alertTitle:"Error",
                    alertMesagge:"Usuario y/o contraseña incorrecta",
                    alertIcon:"error",
                    showConfirmButton:true,
                    timer:false,
                    ruta:'/'

             });
            }else{
           
                if(resultado[0].rol_id==1){
            req.session.nombre=resultado[0].nombre;
            req.session.rol=resultado[0].rol_id;
              //se muestra la infomracion
              data=JSON.stringify(resultado)
              //res.send(data);
              res.render('index',
              
              {
                nombre:req.session.nombre,resultado:resultado,
                  alert:true,
                  alertTitle:"Autentificacion Valida",
                  alertMesagge:"Loguin",
                  alertIcon:"success",
                  showConfirmButton:true,
                  timer:1500,
                  ruta:'admin'
              }
              );
           }else{
            res.render('paginaerror',
            {
                alert:true,
                alertTitle:"Autentificacion Valida",
                alertMesagge:"Loguin",
                alertIcon:"success",
                showConfirmButton:true,
                timer:1500,
                ruta:'restrigido'
            }
            );

           }
            
               
            }
            
                 
            }
        )

      }else{
        res.render('login',{
            alert:true,
            alertTitle:"Error",
            alertMesagge:"ingrese valor por favor",
            alertIcon:"error",
            showConfirmButton:true,
            timer:1500,
            ruta:'/'

     });

      }
    
};


//controller de todos datos
exports.list = (req, res) => {
    
        conexion.query('SELECT usuarios.usuario_id,usuarios.nombre,usuarios.apellido,usuarios.telefono,usuarios.direcion,usuarios.correo,usuarios.rol_id,roles.nombre_rol FROM usuarios INNER JOIN roles ON usuarios.rol_id = roles.Rol_id',(error,resultado)=>{
            if(error){
                //error si no se concetas
             throw error;
            }else{
                //se muestra la infomracion
               // res.send(resultado);
               res.render('index',{resultado:resultado})
            }
            
                 
            })
  };

//controller de datos json para  consulta json
  exports.listlistadata = (req, res) => {
            conexion.query('SELECT usuarios.usuario_id,usuarios.nombre,usuarios.apellido,usuarios.telefono,usuarios.direcion,usuarios.correo,usuarios.rol_id,roles.nombre_rol FROM usuarios INNER JOIN roles ON usuarios.rol_id = roles.Rol_id',(error,resultado)=>{
        if(error){
            //error si no se concetas
         throw error;
        }else{
            //se muestra la infomracion
           // res.send(resultado);
           data=JSON.stringify(resultado)
           res.send(data);
        }
        
             
        }) 
};

 //ruta para poder insertar o guardar en nuestra base de datos
exports.crear = (req, res) => {
    
    conexion.query('select * from roles',(error,resultado)=>{
        if(error){
            //error si no se concetas
         throw error;
        }else{
            //se muestra la infomracion
           // res.send(resultado);
           res.render('crear',{resultado:resultado});
        }
        
             
        }) 
   
};





// el proceso de guardar en base de datps
exports.guardar =(req,res)=>{
    const nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const telefono=req.body.telefono;
    const direccion=req.body.direccion;
    const correo=req.body.correo;
    const rol=req.body.rol;
    const contraseña=req.body.contraseña;
    const contrasehash= bcryptjs.hashSync(contraseña,8);
    //let contraseñahas=  sha1(contraseña);
   // let contraseñahas= crypto.createHash('sha1').update(contraseña).digest('hex');
    conexion.query('INSERT INTO usuarios SET ?' , {nombre:nombre,apellido:apellido,telefono:telefono,direcion:direccion,correo:correo,rol_id:rol, contraseña:contrasehash},(error,resultado)=>{
  
        try {
    
            if(resultado===undefined){
                res.redirect('/crear?fail=true&message=Logged In Successfully');
            }
            else {
                res.redirect('admin?success=true&message=Logged In Successfully');
            }
         console.log(resultado);
         console.log(contraseñahas);
        } catch (error) {
           if (error.code === 'ER_DUP_ENTRY') {
            res.redirect('/crear?fail=true&message=Logged In Successfully');
           } else {
               //here you can handle other errors;
            }
        }
    
    
    } )

};

//nos lleva la vista editar
exports.editar = (req, res) => {
    const id=req.params.id;
        conexion.query('SELECT usuarios.usuario_id,usuarios.nombre,usuarios.apellido,usuarios.telefono,usuarios.direcion,usuarios.correo,usuarios.rol_id,usuarios.contraseña,roles.nombre_rol FROM usuarios INNER JOIN roles ON usuarios.rol_id = roles.Rol_id where  usuarios.usuario_id=?',[id],(error,resultado)=>{
            if(error){
                //error si no se concetas
             throw error;
            }else{
                //se muestra la infomracion
               // res.send(resultado);
               res.render('edit',{usuario:resultado[0]});
            }
            
                 
            }
        )
};


//nos actualiza los datos

exports.actualizar =(req, res)=>{
    const id=req.body.id;
    const nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const telefono=req.body.telefono;
    const direccion=req.body.direccion;
    const correo=req.body.correo;
    const rol=req.body.rol;
    const contraseña=req.body.contraseña;
    const contrasehash= bcryptjs.hashSync(contraseña,8);
    conexion.query('update usuarios SET ? where usuario_id= ?' , [{nombre:nombre,apellido:apellido,telefono:telefono,direcion:direccion,correo:correo,rol_id:rol, contraseña:contrasehash},id],(error,resultado)=>{
  
        try {
    
            if(resultado===undefined){
                res.redirect('/edit?fail=true&message=Logged In Successfully');
            }
            else {
                res.redirect('admin?success=true&message=Logged In Successfully');
            }
         console.log(resultado);
        } catch (error) {
           if (error.code === 'ER_DUP_ENTRY') {
            res.redirect('/edit?fail=true&message=Logged In Successfully');
           } else {
               //here you can handle other errors;
            }
        }
    
    
    } )
};

//eliminar
exports.eliminar = (req, res) => {
    const id=req.params.id;
          conexion.query('delete from usuarios where  usuario_id=?',[id],(error,resultado)=>{
              if(error){
                  //error si no se concetas
               throw error;
              }else{
                  //se muestra la infomracion
                 // res.send(resultado);
                 res.redirect('/admin');
              }
              
                   
              }
          )
};


//ruta elimiar
exports.error = (req, res) => {
    
   
            //se muestra la infomracion
           // res.send(resultado);
          
           res.render('paginaerror');
   
};