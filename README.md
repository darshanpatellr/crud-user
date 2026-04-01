# CRUD User API (Express + MongoDB)

A production-ready, cleanly structured **User CRUD** REST API built with **Node.js**, **Express**, and **MongoDB**.

This repository follows a practical backend layout you’d expect in real services:

- **Routes** define the HTTP surface area.
- **Controllers** handle request/response and orchestration.
- **Models** encapsulate database access.
- **Middleware** enforces validation and consistent error handling.

---

## Deployed Base URL

```
https://crud-user-y5to.onrender.com
```

All endpoints below are relative to:

```
https://crud-user-y5to.onrender.com/api/users
```

---

## Tech Stack

- **Node.js**
- **Express**
- **MongoDB**
- **bcrypt** (password hashing)
- **dotenv** (configuration)

---

## Project Structure

The main source lives in `srs/`:

- `srs/server.js` - boots the server and connects MongoDB
- `srs/app.js` - Express app wiring + middleware + routes
- `srs/controllers/userController.js` - request handlers
- `srs/models/userModel.js` - MongoDB operations
- `srs/config/db.js` - DB connection + `getDB()` helper
- `srs/middleware/validate.js` - request validation
- `srs/middleware/errorHandler.js` - centralized error handling

---

## API Endpoints

### Create User

- **Method:** `POST`
- **Path:** `/api/users`

**Body**

```json
{
  "name": "Darshan",
  "email": "darshan@example.com",
  "password": "secret123",
  "address": "Ahmedabad"
}
```

**curl**

```bash
curl -X POST "https://crud-user-y5to.onrender.com/api/users" \
  -H "Content-Type: application/json" \
  -d '{"name":"Darshan","email":"darshan@example.com","password":"secret123","address":"Ahmedabad"}'
```

---

### Get All Users

- **Method:** `GET`
- **Path:** `/api/users`

**curl**

```bash
curl "https://crud-user-y5to.onrender.com/api/users"
```

---

### Get User By ID

- **Method:** `GET`
- **Path:** `/api/users/profile/:userId`

**curl**

```bash
curl "https://crud-user-y5to.onrender.com/api/users/profile/<userId>"
```

---

### Search Users By Name

- **Method:** `GET`
- **Path:** `/api/users/search?q=<text>`

**curl**

```bash
curl "https://crud-user-y5to.onrender.com/api/users/search?q=darshan"
```

---

### Sort Users By Name (A → Z)

- **Method:** `GET`
- **Path:** `/api/users/sort`

**curl**

```bash
curl "https://crud-user-y5to.onrender.com/api/users/sort"
```

---

### Update User

- **Method:** `PUT`
- **Path:** `/api/users/:userId`

**Body**

```json
{
  "name": "Darshan Patel",
  "address": "Gujarat"
}
```

**curl**

```bash
curl -X PUT "https://crud-user-y5to.onrender.com/api/users/<userId>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Darshan Patel","address":"Gujarat"}'
```

---

### Delete User

- **Method:** `DELETE`
- **Path:** `/api/users/:userId`

**curl**

```bash
curl -X DELETE "https://crud-user-y5to.onrender.com/api/users/<userId>"
```

---

## Common Responses

- **400 Bad Request**
  - Invalid/missing fields
  - Invalid MongoDB ObjectId
  - Empty search query
- **404 Not Found**
  - Route not found
  - User not found
- **409 Conflict**
  - Email already exists
- **500 Internal Server Error**
  - Unhandled error

---

## Local Development (Optional)

### Install

```bash
npm install
```

### Configure environment

Set variables in `srs/.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/
DB_NAME=mydb
PORT=8080
BCRYPT_SALT_ROUNDS=10
```

### Run

```bash
node srs/server.js
```

Local base URL:

```
http://localhost:8080/api/users
```
