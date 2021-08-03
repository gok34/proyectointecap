const express = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs');
const conexion = require('./basedatos/conexion');
const crud = require('./controladores/crud');

router.get('/restrigido', crud.error);
router.get('/', crud.loguin);
router.post('/validarcorreo', crud.validarcorreo);
router.get('/admin', crud.list);
router.get('/data', crud.listlistadata);
router.get('/crear', crud.crear);
router.get('/edit/:id',crud.editar);
router.get('/eliminar/:id',crud.eliminar);

//rutas post de guardar y actualizacion   
router.post('/guardar',crud.guardar);
router.post('/actualizar',crud.actualizar);



module.exports = router;