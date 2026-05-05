const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Middleware para procesar JSON en las peticiones
app.use(express.json());

// 1. CONFIGURACIÓN DE LA CONEXIÓN A POSTGRES
// Los datos se extraen automáticamente de tu archivo .env
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Probar conexión al iniciar
pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error adquiriendo el cliente de la DB', err.stack);
    }
    console.log('✅ Conexión a Postgres establecida con éxito');
    release();
});

// 2. RUTA DE INICIO
app.get('/', (req, res) => {
    res.send('🚀 Servidor de práctica conectado a Postgres funcionando.');
});

// 3. OBTENER USUARIOS (READ) - Viene de la tabla 'usuarios'
app.get('/api/usuarios', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
        res.json(resultado.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error al consultar la base de datos" });
    }
});

// 4. CREAR USUARIO (CREATE) - Guarda en la tabla 'usuarios'
app.post('/api/usuarios', async (req, res) => {
    const { nombre, rol } = req.body;
    try {
        const nuevoUsuario = await pool.query(
            'INSERT INTO usuarios (nombre, rol) VALUES ($1, $2) RETURNING *',
            [nombre, rol]
        );
        res.status(201).json(nuevoUsuario.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});

// 5. ELIMINAR USUARIO (DELETE)
app.delete('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.json({ mensaje: `Usuario con id ${id} eliminado correctamente` });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error al eliminar" });
    }
});

// ACTUALIZAR ROL DE USUARIO
app.put('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { rol } = req.body;
    try {
        const actualizado = await pool.query(
            'UPDATE usuarios SET rol = $1 WHERE id = $2 RETURNING *',
            [rol, id]
        );
        res.json(actualizado.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. LANZAR EL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ API corriendo en http://localhost:${PORT}`);
});