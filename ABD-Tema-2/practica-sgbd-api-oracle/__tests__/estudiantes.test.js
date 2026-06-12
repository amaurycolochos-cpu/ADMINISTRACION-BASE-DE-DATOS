// ============================================================
//  estudiantes.test.js -> pruebas del microservicio Oracle
//  jest + supertest, la app se importa sin levantar el puerto.
//  se necesita iniciar el pool de oracle en beforeAll porque
//  oracledb no crea el pool automatico como mysql2
// ============================================================
require('dotenv').config();
const request = require('supertest');
const app     = require('../src/app');
const { iniciarPool, oracledb } = require('../src/db');

// guardo el id del estudiante que creo en el post
let idCreado;

// inicio el pool antes de cualquier prueba, sin esto truena todo
beforeAll(async () => {
  await iniciarPool();
});

// al terminar cierro el pool de oracle para que jest no se quede colgado
afterAll(async () => {
  try { await oracledb.getPool().close(0); } catch (_) {}
});

// ── SALUD ────────────────────────────────────────────────────
describe('Endpoints de salud', () => {
  // la api oracle debe responder activo
  test('GET /api/salud devuelve 200 y estado activo', async () => {
    const res = await request(app).get('/api/salud');
    expect(res.status).toBe(200);
    expect(res.body.estado).toBe('activo');
  });

  // el estado debe traer el motor oracle y la version
  test('GET /api/sgbd/estado devuelve 200 con motor Oracle Database', async () => {
    const res = await request(app).get('/api/sgbd/estado');
    expect(res.status).toBe(200);
    expect(res.body.estado).toBe('conectado');
    expect(res.body.motor).toBe('Oracle Database');
    expect(res.body.version).toBeDefined();
  });
});

// ── CRUD ─────────────────────────────────────────────────────
describe('CRUD de estudiantes (Oracle)', () => {
  // listar todos, debe ser un arreglo
  test('GET /api/estudiantes devuelve 200 y datos es arreglo', async () => {
    const res = await request(app).get('/api/estudiantes');
    expect(res.status).toBe(200);
    expect(res.body.exito).toBe(true);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  // creo uno con valores unicos para no chocr con el UNIQUE de email y matricula
  test('POST /api/estudiantes crea uno nuevo y devuelve 201', async () => {
    const ts = Date.now();
    const res = await request(app)
      .post('/api/estudiantes')
      .send({ nombre: 'Prueba Jest', email: `jest${ts}@test.com`, matricula: `J${ts}` });
    expect(res.status).toBe(201);
    expect(res.body.exito).toBe(true);
    expect(res.body.id).toBeDefined();
    idCreado = res.body.id; // me lo guardo
  });

  // busco por id, oracle devuelve columnas en mayusculas (ID, no id)
  test('GET /api/estudiantes/:id devuelve el estudiante creado', async () => {
    const res = await request(app).get(`/api/estudiantes/${idCreado}`);
    expect(res.status).toBe(200);
    expect(res.body.exito).toBe(true);
    expect(res.body.datos.ID).toBe(idCreado);
  });

  // actualizo el estado
  test('PUT /api/estudiantes/:id actualiza el estado', async () => {
    const res = await request(app)
      .put(`/api/estudiantes/${idCreado}`)
      .send({ estado: 'inactivo' });
    expect(res.status).toBe(200);
    expect(res.body.exito).toBe(true);
  });

  // elimino para no dejar datos de prueba en oracle
  test('DELETE /api/estudiantes/:id elimina al estudiante', async () => {
    const res = await request(app).delete(`/api/estudiantes/${idCreado}`);
    expect(res.status).toBe(200);
    expect(res.body.exito).toBe(true);
  });

  // body vacio debe dar 400
  test('POST sin campos devuelve 400', async () => {
    const res = await request(app).post('/api/estudiantes').send({});
    expect(res.status).toBe(400);
    expect(res.body.exito).toBe(false);
  });
});
