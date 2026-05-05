# 🚀 MY FIRST API - Proyecto de Aprendizaje CRUD REST

## 📖 Descripción

**My First API** es un proyecto educativo diseñado para aprender los conceptos fundamentales de:

- **API REST**: Desarrollo de servicios web con Node.js
- **CRUD**: Operaciones básicas (Create, Read, Update, Delete)
- **Base de Datos Relacional**: Gestión de datos con PostgreSQL
- **Frontend Dinámico**: Interacción con APIs desde HTML/CSS/JavaScript

Este proyecto permite gestionar usuarios a través de una interfaz web intuitiva, realizando operaciones completas de CRUD sobre una base de datos PostgreSQL.

---

## 🎯 Objetivos del Proyecto

✅ Aprender a crear una API REST desde cero  
✅ Implementar operaciones CRUD completas  
✅ Conectar una base de datos PostgreSQL con Node.js  
✅ Desarrollar un frontend que consuma la API  
✅ Entender el flujo solicitud-respuesta HTTP  
✅ Practicar con middleware y manejo de errores

---

## 💻 Tecnologías Utilizadas

| Tecnología             | Descripción                                       |
| ---------------------- | ------------------------------------------------- |
| **Node.js**            | Runtime de JavaScript para el backend             |
| **Express.js**         | Framework minimalista para crear APIs REST        |
| **PostgreSQL**         | Base de datos relacional para almacenar datos     |
| **pg**                 | Driver Node.js para conectar con PostgreSQL       |
| **CORS**               | Middleware para permitir solicitudes cross-origin |
| **dotenv**             | Gestor de variables de entorno                    |
| **Bootstrap 5**        | Framework CSS para diseño responsivo              |
| **Vanilla JavaScript** | Fetch API para consumir endpoints                 |

---

## 📂 Estructura del Proyecto

```
MY-FIRST-API/
├── index.js              # Servidor Express y rutas API
├── package.json          # Dependencias y configuración
├── README.md             # Este archivo
├── .env                  # Variables de entorno (base de datos)
├── .env.example          # Plantilla de variables
└── public/
    └── index.html        # Interfaz de usuario (panel de control)
```

---

## 🔧 Instalación y Configuración

### 1. Clonar o descargar el proyecto

```bash
cd MY-FIRST-API
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

```env
DB_USER=tu_usuario
DB_HOST=localhost
DB_NAME=nombre_base_datos
DB_PASSWORD=contraseña
DB_PORT=5432
PORT=3000
```

### 4. Crear tabla en PostgreSQL

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  rol VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Iniciar el servidor

```bash
npm start
```

El servidor estará disponible en: **http://localhost:3000**

---

## 📡 API Endpoints (CRUD)

### 📖 READ - Obtener todos los usuarios

```http
GET /api/usuarios
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "rol": "Admin",
    "created_at": "2026-05-05T10:30:00.000Z"
  },
  {
    "id": 2,
    "nombre": "María",
    "rol": "Usuario",
    "created_at": "2026-05-05T10:35:00.000Z"
  }
]
```

### ➕ CREATE - Crear nuevo usuario

```http
POST /api/usuarios
Content-Type: application/json

{
  "nombre": "Pedro",
  "rol": "Editor"
}
```

**Respuesta (201):**

```json
{
  "id": 3,
  "nombre": "Pedro",
  "rol": "Editor",
  "created_at": "2026-05-05T10:40:00.000Z"
}
```

### ✏️ UPDATE - Actualizar usuario

```http
PUT /api/usuarios/1
Content-Type: application/json

{
  "nombre": "Juan Carlos",
  "rol": "Administrador"
}
```

**Respuesta:**

```json
{
  "id": 1,
  "nombre": "Juan Carlos",
  "rol": "Administrador",
  "created_at": "2026-05-05T10:30:00.000Z"
}
```

### 🗑️ DELETE - Eliminar usuario

```http
DELETE /api/usuarios/1
```

**Respuesta:**

```json
{
  "mensaje": "Usuario con id 1 eliminado correctamente"
}
```

---

## 🎨 Interfaz de Usuario

La aplicación incluye un **panel de control intuitivo** con las siguientes funcionalidades:

### Características del Panel:

- 📝 **Formulario de creación**: Añade usuarios fácilmente con nombre y rol
- 📋 **Tabla de usuarios**: Visualiza todos los usuarios registrados
- ✏️ **Botón Editar**: Abre un modal para actualizar nombre y rol
- 🗑️ **Botón Eliminar**: Elimina usuarios con confirmación
- 📱 **Diseño Responsivo**: Compatible con móviles y escritorio
- 🎯 **Interactividad**: Actualización en tiempo real sin recargar la página

### Screenshot del Panel:

```
┌─────────────────────────────────────┐
│  🚀 Panel de Control de Usuarios    │
├─────────────────────────────────────┤
│ Nombre: [________]  Rol: [_______]  │
│                           [Añadir]  │
├─────────────────────────────────────┤
│ ID │ Nombre  │ Rol      │ Acciones  │
├────┼─────────┼──────────┼───────────┤
│ 1  │ Juan    │ Admin    │[E][D]     │
│ 2  │ María   │ Usuario  │[E][D]     │
└─────────────────────────────────────┘
  E = Editar   D = Eliminar
```

---

## 🚀 Cómo Usar la Aplicación

1. **Abrir el navegador** → http://localhost:3000
2. **Crear usuario**: Ingresa nombre y rol, haz clic en "Añadir"
3. **Ver usuarios**: La tabla se actualiza automáticamente
4. **Editar usuario**: Haz clic en "Editar", modifica nombre y/o rol, guarda
5. **Eliminar usuario**: Haz clic en "Eliminar" y confirma

---

## 📚 Conceptos Aprendidos

### ¿Qué es una API REST?

Una **API REST** (Representational State Transfer) es un servicio web que permite:

- **Solicitar datos** (GET)
- **Enviar datos** (POST)
- **Modificar datos** (PUT/PATCH)
- **Eliminar datos** (DELETE)

Usa el protocolo HTTP con métodos estándar para comunicarse entre cliente y servidor.

### ¿Qué es CRUD?

**CRUD** son las cuatro operaciones básicas en bases de datos:

- **C (Create)**: Crear nuevos registros → POST
- **R (Read)**: Leer/obtener registros → GET
- **U (Update)**: Actualizar registros → PUT
- **D (Delete)**: Eliminar registros → DELETE

### Flujo de la Aplicación

```
Usuario interactúa en el navegador
            ↓
JavaScript (Fetch API) envía solicitud HTTP
            ↓
Express.js recibe la solicitud
            ↓
PostgreSQL procesa la operación en la BD
            ↓
Express.js devuelve respuesta JSON
            ↓
JavaScript actualiza el DOM (tabla)
            ↓
Usuario ve los cambios en tiempo real
```

---

## 🔒 Manejo de Errores

La aplicación incluye:

- ✅ Validación de campos no vacíos
- ✅ Manejo de errores de conexión a BD
- ✅ Respuestas HTTP con códigos de estado apropiados
- ✅ Mensajes de confirmación para acciones destructivas

---

## 🎓 Lecciones Principales

1. **Middleware Express**: Uso de `cors()`, `express.json()`, y `express.static()`
2. **Consultas parametrizadas**: Prevención de inyección SQL con `$1, $2`
3. **Async/Await**: Manejo de operaciones asincrónicas
4. **Modal Bootstrap**: Implementación de diálogos interactivos
5. **Fetch API**: Consumo de endpoints desde el navegador
6. **Variables de entorno**: Protección de credenciales sensibles

---

## 📝 Próximos Pasos / Mejoras

- [ ] Agregar autenticación de usuarios
- [ ] Implementar paginación
- [ ] Agregar búsqueda y filtrado
- [ ] Validación más robusta en el backend
- [ ] Tests unitarios e integración
- [ ] Documentación API con Swagger
- [ ] Desplegar en producción

---

## 📄 Licencia

Este es un proyecto educativo sin licencia específica.

---

## ✍️ Autor

**Felipe Iglesias** - Proyecto de aprendizaje (Mayo 2026)
