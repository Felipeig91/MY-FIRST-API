const express = require('express');
const app = express();

// Middleware para que la API entienda JSON
app.use(express.json());

// Base de datos temporal (se limpia si reinicias el servidor)
let usuarios = [
    { id: 1, nombre: "Felipe", rol: "Desarrollador" },
    { id: 2, nombre: "Ana", rol: "Diseñadora" }
];

// RUTA INICIAL (GET) - Para saber si la API funciona
app.get('/', (req, res) => {
    res.send('🚀 Servidor funcionando correctamente.');
});

// OBTENER TODOS LOS USUARIOS (GET)
app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});

// AGREGAR UN USUARIO (POST)
app.post('/api/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        rol: req.body.rol
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json({ mensaje: "Usuario creado", data: nuevoUsuario });
});

// ELIMINAR UN USUARIO (DELETE)
app.delete('/api/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    usuarios = usuarios.filter(u => u.id !== id);
    res.json({ mensaje: `Usuario con id ${id} eliminado` });
});

// CONFIGURAR PUERTO PARA EL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ API corriendo en http://localhost:${PORT}`);
});