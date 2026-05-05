# 🚀 MY FIRST API - CRUD Learning Project

## 📖 Description

**My First API** is an educational project designed to learn the fundamental concepts of:

- **REST API**: Web service development with Node.js
- **CRUD**: Basic operations (Create, Read, Update, Delete)
- **Relational Database**: Data management with PostgreSQL
- **Dynamic Frontend**: API interaction with HTML/CSS/JavaScript

This project allows managing users through an intuitive web interface, performing complete CRUD operations on a PostgreSQL database.

---

## 🎯 Project Objectives

✅ Learn to create a REST API from scratch  
✅ Implement complete CRUD operations  
✅ Connect a PostgreSQL database with Node.js  
✅ Develop a frontend that consumes the API  
✅ Understand HTTP request-response flow  
✅ Practice with middleware and error handling

---

## 💻 Technologies Used

| Technology             | Description                                  |
| ---------------------- | -------------------------------------------- |
| **Node.js**            | JavaScript runtime for the backend           |
| **Express.js**         | Lightweight framework for building REST APIs |
| **PostgreSQL**         | Relational database for data storage         |
| **pg**                 | Node.js driver for PostgreSQL connection     |
| **CORS**               | Middleware to allow cross-origin requests    |
| **dotenv**             | Environment variables manager                |
| **Bootstrap 5**        | CSS framework for responsive design          |
| **Vanilla JavaScript** | Fetch API for consuming endpoints            |

---

## 📂 Project Structure

```
MY-FIRST-API/
├── index.js              # Express server and API routes
├── package.json          # Dependencies and configuration
├── README.md             # This file
├── .env                  # Environment variables (database)
├── .env.example          # Variables template
└── public/
    └── index.html        # User interface (control panel)
```

---

## 🔧 Installation and Setup

### 1. Clone or download the project

```bash
cd MY-FIRST-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
DB_USER=your_user
DB_HOST=localhost
DB_NAME=database_name
DB_PASSWORD=password
DB_PORT=5432
PORT=3000
```

### 4. Create table in PostgreSQL

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  rol VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Start the server

```bash
npm start
```

The server will be available at: **http://localhost:3000**

---

## 📡 API Endpoints (CRUD)

### 📖 READ - Get all users

```http
GET /api/usuarios
```

**Response:**

```json
[
  {
    "id": 1,
    "nombre": "John",
    "rol": "Admin",
    "created_at": "2026-05-05T10:30:00.000Z"
  },
  {
    "id": 2,
    "nombre": "Maria",
    "rol": "User",
    "created_at": "2026-05-05T10:35:00.000Z"
  }
]
```

### ➕ CREATE - Create new user

```http
POST /api/usuarios
Content-Type: application/json

{
  "nombre": "Peter",
  "rol": "Editor"
}
```

**Response (201):**

```json
{
  "id": 3,
  "nombre": "Peter",
  "rol": "Editor",
  "created_at": "2026-05-05T10:40:00.000Z"
}
```

### ✏️ UPDATE - Update user

```http
PUT /api/usuarios/1
Content-Type: application/json

{
  "nombre": "John Smith",
  "rol": "Administrator"
}
```

**Response:**

```json
{
  "id": 1,
  "nombre": "John Smith",
  "rol": "Administrator",
  "created_at": "2026-05-05T10:30:00.000Z"
}
```

### 🗑️ DELETE - Delete user

```http
DELETE /api/usuarios/1
```

**Response:**

```json
{
  "message": "User with id 1 successfully deleted"
}
```

---

## 🎨 User Interface

The application includes an **intuitive control panel** with the following features:

### Panel Features:

- 📝 **Creation Form**: Easily add users with name and role
- 📋 **Users Table**: View all registered users
- ✏️ **Edit Button**: Opens a modal to update name and role
- 🗑️ **Delete Button**: Removes users with confirmation
- 📱 **Responsive Design**: Compatible with mobile and desktop
- 🎯 **Interactivity**: Real-time updates without page reload

### Panel Screenshot:

```
┌──────────────────────────────────────┐
│  🚀 Users Control Panel              │
├──────────────────────────────────────┤
│ Name: [________]  Role: [________]   │
│                           [Add]      │
├──────────────────────────────────────┤
│ ID │ Name    │ Role     │ Actions    │
├────┼─────────┼──────────┼────────────┤
│ 1  │ John    │ Admin    │[E][D]      │
│ 2  │ Maria   │ User     │[E][D]      │
└──────────────────────────────────────┘
  E = Edit   D = Delete
```

---

## 🚀 How to Use the Application

1. **Open browser** → http://localhost:3000
2. **Create user**: Enter name and role, click "Add"
3. **View users**: The table updates automatically
4. **Edit user**: Click "Edit", modify name and/or role, save
5. **Delete user**: Click "Delete" and confirm

---

## 📚 Concepts Learned

### What is a REST API?

A **REST API** (Representational State Transfer) is a web service that allows:

- **Request data** (GET)
- **Send data** (POST)
- **Modify data** (PUT/PATCH)
- **Delete data** (DELETE)

It uses the HTTP protocol with standard methods to communicate between client and server.

### What is CRUD?

**CRUD** are the four basic database operations:

- **C (Create)**: Create new records → POST
- **R (Read)**: Read/retrieve records → GET
- **U (Update)**: Update records → PUT
- **D (Delete)**: Delete records → DELETE

### Application Flow

```
User interacts in the browser
            ↓
JavaScript (Fetch API) sends HTTP request
            ↓
Express.js receives the request
            ↓
PostgreSQL processes the operation in the DB
            ↓
Express.js returns JSON response
            ↓
JavaScript updates the DOM (table)
            ↓
User sees changes in real-time
```

---

## 🔒 Error Handling

The application includes:

- ✅ Non-empty field validation
- ✅ Database connection error handling
- ✅ HTTP responses with appropriate status codes
- ✅ Confirmation messages for destructive actions

---

## 🎓 Key Lessons

1. **Express Middleware**: Using `cors()`, `express.json()`, and `express.static()`
2. **Parameterized Queries**: SQL injection prevention with `$1, $2`
3. **Async/Await**: Asynchronous operations handling
4. **Bootstrap Modal**: Interactive dialog implementation
5. **Fetch API**: Consuming endpoints from the browser
6. **Environment Variables**: Protecting sensitive credentials

---

## 📝 Next Steps / Improvements

- [ ] Add user authentication
- [ ] Implement pagination
- [ ] Add search and filtering
- [ ] More robust backend validation
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Deploy to production

---

## 📄 License

This is an educational project without a specific license.

---

## ✍️ Author

**Felipe Pinuer** - Learning project (May 2026)
