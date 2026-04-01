# CRUD User API (Node.js + Express + MongoDB)

A beginner-friendly Node.js project that shows how to build a simple **User CRUD** REST API using:

- **Node.js** (runtime)
- **Express** (web framework)
- **MongoDB Atlas** (database)
- **mongodb** driver (DB connection)
- **bcrypt** (password hashing)
- **dotenv** (environment variables)

This project is good for learning how a typical backend is structured: **routes → controllers → models → database**.

---

## What you can do (Features)

- **Create user** (with password hashing)
- **Get all users**
- **Get user by ID**
- **Update user** (name + address)
- **Delete user**
- **Search users by name**
- **Sort users by name (A → Z)**

---

## Project structure (Folder guide)

The main code is inside the `srs/` folder:

- **`srs/server.js`**
  - Starts the server
  - Loads `.env`
  - Connects to MongoDB
- **`srs/app.js`**
  - Creates the Express app
  - Adds middleware
  - Mounts routes at `/api/users`
- **`srs/routes/userRoutes.js`**
  - Defines all endpoints (URLs)
  - Connects each endpoint to a controller function
- **`srs/controllers/userController.js`**
  - Handles request/response logic (business logic)
- **`srs/models/userModel.js`**
  - Talks to MongoDB (insert/find/update/delete)
- **`srs/config/db.js`**
  - MongoDB client connection + `getDB()` helper
- **`srs/middleware/validate.js`**
  - Validates request body, query params, and `ObjectId`
- **`srs/middleware/errorHandler.js`**
  - 404 + global error handler

---

## Prerequisites

- **Node.js** installed (recommended: Node 18+)
- A **MongoDB Atlas** connection string (or local MongoDB)

---

## Setup (Step-by-step)

### 1) Install dependencies

From the project root (where `package.json` exists):

```bash
npm install
```

### 2) Create / update `.env`

Your project reads environment variables from `srs/.env`.

Current variables used by the code:

- `MONGO_URI` (MongoDB connection string)
- `DB_NAME` (Database name)
- `PORT` (Server port)
- `BCRYPT_SALT_ROUNDS` (bcrypt salt rounds, example: `10`)

Example (`srs/.env`):

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/
DB_NAME=mydb
PORT=8080
BCRYPT_SALT_ROUNDS=10
```

### Security note

Do **not** commit real usernames/passwords in `.env` to GitHub.

---

## Run the project

Because `server.js` is inside `srs/`, start the app with:

```bash
node srs/server.js
```

When it works, you should see something like:

- `✅  Connected to MongoDB Atlas`
- `Server running on http://localhost:8080`

---

## API Base URL

All routes are under:

```
http://localhost:<PORT>/api/users
```

If your `PORT=8080`, then:

```
http://localhost:8080/api/users
```

---

## API Endpoints

### 1) Create user

- **Method:** `POST`
- **URL:** `/api/users`
- **Validates:** `name`, `email`, `password` required; password length >= 6

**Request body**:

```json
{
  "name": "Darshan",
  "email": "darshan@example.com",
  "password": "secret123",
  "address": "Ahmedabad"
}
```

**Response (201)**:

```json
{
  "statusCode": 201,
  "message": "User created successfully",
  "data": {
    "userId": "...",
    "name": "Darshan",
    "email": "darshan@example.com"
  }
}
```

---

### 2) Get all users

- **Method:** `GET`
- **URL:** `/api/users`

---

### 3) Get user by ID

- **Method:** `GET`
- **URL:** `/api/users/profile/:userId`

Example:

```bash
curl http://localhost:8080/api/users/profile/<userId>
```

---

### 4) Search users by name

- **Method:** `GET`
- **URL:** `/api/users/search?q=<text>`
- **Validates:** `q` cannot be empty

Example:

```bash
curl "http://localhost:8080/api/users/search?q=darshan"
```

---

### 5) Get users sorted by name (A → Z)

- **Method:** `GET`
- **URL:** `/api/users/sort`

---

### 6) Update user

- **Method:** `PUT`
- **URL:** `/api/users/:userId`
- **Updates:** `name`, `address`

**Request body**:

```json
{
  "name": "Darshan Patel",
  "address": "Gujarat"
}
```

---

### 7) Delete user

- **Method:** `DELETE`
- **URL:** `/api/users/:userId`

---

## Common errors & meaning

- **400 Bad Request**
  - Missing required fields
  - Invalid email format
  - Password too short
  - Invalid MongoDB ObjectId in URL
  - Empty search query
- **404 Not Found**
  - Route not found
  - User not found
- **409 Conflict**
  - User already exists with the same email
- **500 Internal Server Error**
  - Unhandled backend error

---

## How the request flows (Easy explanation)

Example: `GET /api/users`

1. **Route** (`srs/routes/userRoutes.js`) matches `router.get('/')`
2. It calls the **controller** (`userController.getAllUsers`)
3. Controller calls the **model** (`userModel.findAllUsers`)
4. Model reads from MongoDB using `getDB()` and returns data
5. Controller sends JSON response back to the client

---

## Next improvements (Good learning tasks)

- Add `npm` scripts (like `start` / `dev`)
- Add authentication (login endpoint + JWT)
- Add input validation with a library (Joi / Zod)
- Add pagination for `GET /api/users`
- Hide password field when returning user objects

---

## Quick test using curl (copy/paste)

Create:

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Darshan","email":"darshan@example.com","password":"secret123","address":"Ahmedabad"}'
```

Get all:

```bash
curl http://localhost:8080/api/users
```

---

## License

ISC
