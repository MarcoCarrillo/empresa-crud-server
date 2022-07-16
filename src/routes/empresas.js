const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//Obtener empresas ordenadas
router.get('/obtenerEmpresas', (req, res) => {
    mysqlConnection.query('SELECT nombre, tipo, date_format(fecha_constitucion, "%d-%m-%Y") as fecha_constitucion FROM empresas ORDER BY nombre', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});


//Crear empresa
router.post('/crearEmpresas', (req, res) => {
    const nombre = req.body.nombre;
    const fecha_constitucion = req.body.fecha_constitucion;
    const tipo = req.body.tipo;
    const comentarios = req.body.comentarios;
    console.log(req.body);
    mysqlConnection.query('INSERT INTO empresas (nombre, fecha_constitucion, tipo, comentarios) VALUES (?,?,?,?)', [nombre, fecha_constitucion, tipo, comentarios], (err, rows, fields) => {
        if(!err){
            res.json({status: 'Empresa agregada correctamente'});
        } else {
            res.status(400).json({status: 'Hubo un error'});
            console.log(err);
        }
    });
});

//Editar empresa por id
router.put('/editarEmpresa/:id', (req, res) => {
    const {id} = req.params;
    const {nombre, fecha_constitucion, tipo, comentarios} = req.body;
    mysqlConnection.query('UPDATE empresas SET nombre = ?, fecha_constitucion = ?, tipo = ?, comentarios = ? WHERE id = ?', [nombre, fecha_constitucion, tipo, comentarios, id],  (err, rows, fields) => {
        if(!err){
            res.json({status: 'Empresa actualizada'});
        } else {
            res.status(400).json({status: 'Hubo un error'});
            console.log(err);
        }
    });
});

//Eliminar empresa por su id
router.delete('/eliminarEmpresa/:id', (req, res) => {
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM empresas WHERE id = ?', [id], (err, rows, fields) =>{
        if(!err){
            res.json({status : 'Empresa eliminada'});
        } else {
            res.status(400).json({status: 'Hubo un error'});
            console.log(err);
        }
    })
});


module.exports = router;