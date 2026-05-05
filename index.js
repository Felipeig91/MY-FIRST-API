const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// --- MIDDLEWARES (Configuraciones) ---
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite leer JSON en las peticiones
app.use(express.static('public')); // Sirve automáticamente tu index.html desde la carpeta /public

// --- 1. CONFIGURACIÓN DE POSTGRES ---
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

// --- 2. RUTAS DE LA API ---

// Obtener todos los usuarios (READ)
app.get('/api/usuarios', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
        res.json(resultado.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error al consultar la base de datos" });
    }
});

// Crear usuario (CREATE)
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

// Actualizar usuario (UPDATE)
app.put('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, rol } = req.body;
    try {
        const actualizado = await pool.query(
            'UPDATE usuarios SET nombre = $1, rol = $2 WHERE id = $3 RETURNING *',
            [nombre, rol, id]
        );
        res.json(actualizado.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar usuario (DELETE)
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

// --- 3. LANZAR EL SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ API corriendo en http://localhost:${PORT}`);
});