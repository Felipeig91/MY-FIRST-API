const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// --- MIDDLEWARES (Configuration) ---
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Allow reading JSON in requests
app.use(express.static('public')); // Automatically serve index.html from public folder

// --- 1. POSTGRES CONFIGURATION ---
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test connection at startup
pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error acquiring database client', err.stack);
    }
    console.log('✅ PostgreSQL connection established successfully');
    release();
});

// --- 2. API ROUTES ---

// Get all users (READ)
app.get('/api/usuarios', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
        res.json(resultado.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error querying the database" });
    }
});

// Create user (CREATE)
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
        res.status(500).json({ error: "Error inserting into database" });
    }
});

// Update user (UPDATE)
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

// Delete user (DELETE)
app.delete('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.json({ message: `User with id ${id} successfully deleted` });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error deleting" });
    }
});

// --- 3. START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ API running at http://localhost:${PORT}`);
});