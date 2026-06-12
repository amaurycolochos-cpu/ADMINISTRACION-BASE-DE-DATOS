// ============================================================
//  estudiantes.js  ->  Aqui estan las rutas del CRUD.
//  CRUD = Crear, Leer, Actualizar y Borrar.
//  Cada metodo HTTP se traduce a una operacion de SQL:
//    GET    -> SELECT   (leer)
//    POST   -> INSERT   (crear)
//    PUT    -> UPDATE   (actualizar)
//    DELETE -> DELETE   (borrar)
//  OJO: en Oracle los parametros van con :nombre (no con ? como MySQL).
// ============================================================
const express = require('express');
const router = express.Router();
const { oracledb, consulta } = require('../db');

// GET /api/estudiantes -> me trae TODOS los estudiantes
router.get('/estudiantes', async (req, res) => {
  try {
    const result = await consulta('SELECT * FROM estudiantes ORDER BY id');
    res.json({ exito: true, cantidad: result.rows.length, datos: result.rows });
  } catch (err) {
    res.status(500).json({ exito: false, error: err.message });
  }
});

// GET /api/estudiantes/:id -> trae solo UNO, buscado por su id
router.get('/estudiantes/:id', async (req, res) => {
  try {
    // el :id de la URL lo paso como parametro nombrado a la consulta
    const result = await consulta(
      'SELECT * FROM estudiantes WHERE id = :id',
      { id: Number(req.params.id) }
    );
    if (result.rows.length === 0)
      return res.status(404).json({ exito: false, mensaje: 'No encontrado' });
    res.json({ exito: true, datos: result.rows[0] });
  } catch (err) {
    res.status(500).json({ exito: false, error: err.message });
  }
});

// POST /api/estudiantes -> crea un estudiante nuevo
router.post('/estudiantes', async (req, res) => {
  const { nombre, email, matricula } = req.body; // datos que mandan en el body
  // valido que no vengan vacios, si no marco error 400
  if (!nombre || !email || !matricula) {
    return res.status(400).json({ exito: false, mensaje: 'nombre, email y matricula son requeridos' });
  }
  try {
    // RETURNING id INTO :id -> Oracle me devuelve el id que se acaba de crear
    const result = await consulta(
      `INSERT INTO estudiantes (nombre, email, matricula)
       VALUES (:nombre, :email, :matricula)
       RETURNING id INTO :id`,
      {
        nombre, email, matricula,
        id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );
    res.status(201).json({ exito: true, id: result.outBinds.id[0], mensaje: 'Estudiante creado' });
  } catch (err) {
    res.status(500).json({ exito: false, error: err.message });
  }
});

// PUT /api/estudiantes/:id -> actualisa un estudiante que ya existe
router.put('/estudiantes/:id', async (req, res) => {
  const { nombre, email, estado } = req.body;
  try {
    // NVL(valor, columna): si mando null, deja el valor que ya tenia.
    const result = await consulta(
      `UPDATE estudiantes
         SET nombre = NVL(:nombre, nombre),
             email  = NVL(:email, email),
             estado = NVL(:estado, estado)
       WHERE id = :id`,
      {
        nombre: nombre ?? null,
        email: email ?? null,
        estado: estado ?? null,
        id: Number(req.params.id)
      }
    );
    if (result.rowsAffected === 0)
      return res.status(404).json({ exito: false, mensaje: 'No encontrado' });
    res.json({ exito: true, mensaje: 'Estudiante actualizado' });
  } catch (err) {
    res.status(500).json({ exito: false, error: err.message });
  }
});

// DELETE /api/estudiantes/:id -> borra un estudiante por su id
router.delete('/estudiantes/:id', async (req, res) => {
  try {
    const result = await consulta(
      'DELETE FROM estudiantes WHERE id = :id',
      { id: Number(req.params.id) }
    );
    if (result.rowsAffected === 0)
      return res.status(404).json({ exito: false, mensaje: 'No encontrado' });
    res.json({ exito: true, mensaje: 'Estudiante eliminado' });
  } catch (err) {
    res.status(500).json({ exito: false, error: err.message });
  }
});

module.exports = router; // exporto las rutas para engancharlas en app.js
