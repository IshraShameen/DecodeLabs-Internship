# Blueprint Studio API - Backend API Development

**DecodeLabs Full Stack Internship - Project 2: The Nervous System**

A small, dependency-light REST API built with **Node.js and Express**.
Project 1 was the skin (the responsive frontend); this is the nervous
system — the endpoints, validation, and status codes that let a client
and server talk to each other reliably.

No database is used on purpose - the brief for this project is about API
logic, not persistence. Data lives in memory and resets on restart. The
data layer (`data/store.js`) is isolated behind plain functions, so a
real database can be dropped in later without touching any route file.

---

## ✨ Features

- **RESTful resource naming** - `/api/projects`, `/api/messages` (nouns),
  never `/getProjects` or `/createMessage` (verbs baked into the URL).
- **GET and POST endpoints** for two resources: `projects` and
  `messages` (a contact-form inbox).
- **Server-side validation on every write** - "never trust the client."
  Invalid input never reaches the data layer; it's rejected with a
  clear, field-level error list.
- **Meaningful HTTP status codes throughout**:
  - `200 OK` - successful GET
  - `201 Created` - successful POST that creates a resource
  - `400 Bad Request` - validation failed
  - `404 Not Found` - resource or route doesn't exist
  - `500 Internal Server Error` - caught by a central error handler
- **CORS enabled**, so Project 1's frontend (or any frontend) can call
  this API directly from the browser during local development.

## 📁 Project structure

```
.
├── server.js              # App entry point, middleware, error handling
├── routes/
│   ├── projects.js        # GET /api/projects, GET /:id, POST /
│   └── messages.js        # GET /api/messages, POST /
├── middleware/
│   └── validate.js        # Request body validation
├── data/
│   └── store.js           # In-memory data store (swap for a DB later)
├── package.json
├── .gitignore
└── README.md
```

## 🚀 Getting started

Requires [Node.js](https://nodejs.org) (v18 or later recommended).

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# Server runs at http://localhost:3000
```

For auto-restart on file changes during development:
```bash
npm run dev
```

## 📡 API reference

Base URL: `http://localhost:3000/api`

### Health check

```
GET /api/health
```
Returns `200` with server status and uptime. Useful for confirming the
server is running before testing other endpoints.

---

### Projects

| Method | Endpoint | Description | Success | Failure |
|---|---|---|---|---|
| GET | `/api/projects` | List all projects. Optional `?category=` filter (`frontend`, `fullstack`, `design`) | `200` | — |
| GET | `/api/projects/:id` | Get one project by numeric id | `200` | `404` if not found, `400` if id isn't a number |
| POST | `/api/projects` | Create a new project | `201` | `400` if validation fails |

**POST /api/projects — request body:**
```json
{
  "title": "Accessibility Audit",
  "category": "design",
  "description": "A WCAG pass across an existing product."
}
```
`category` must be one of `frontend`, `fullstack`, `design`.

**Example — success (201):**
```json
{
  "status": "success",
  "data": {
    "id": 4,
    "title": "Accessibility Audit",
    "category": "design",
    "description": "A WCAG pass across an existing product."
  }
}
```

**Example — validation failure (400):**
```json
{
  "status": "error",
  "errors": [
    "title is required and must be at least 2 characters.",
    "category must be one of: frontend, fullstack, design."
  ]
}
```

---

### Messages (contact form inbox)

| Method | Endpoint | Description | Success | Failure |
|---|---|---|---|---|
| GET | `/api/messages` | List all submitted messages | `200` | — |
| POST | `/api/messages` | Submit a new contact message | `201` | `400` if validation fails |

**POST /api/messages — request body:**
```json
{
  "name": "Asha Rao",
  "email": "asha@example.com",
  "message": "Interested in a landing page rebuild."
}
```

**Example — success (201):**
```json
{
  "status": "success",
  "message": "Message received. We'll be in touch soon.",
  "data": {
    "id": 1,
    "name": "Asha Rao",
    "email": "asha@example.com",
    "message": "Interested in a landing page rebuild.",
    "receivedAt": "2026-07-26T19:28:40.713Z"
  }
}
```

---

## 🧪 Try it with curl

```bash
# List projects
curl http://localhost:3000/api/projects

# Filter by category
curl "http://localhost:3000/api/projects?category=frontend"

# Get a single project
curl http://localhost:3000/api/projects/1

# Create a project
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"New Project","category":"frontend","description":"A short description here."}'

# Submit a contact message
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","message":"Tell me more about your work."}'
```

You can also import these into **Postman** or **Insomnia** manually, or
test directly in the browser for GET routes.

## 🧭 Design notes (why it's built this way)

- **Nouns, not verbs, in URLs.** `/api/projects`, not `/api/getProjects` —
  the HTTP method (`GET`/`POST`) already says what action is happening.
- **Validation lives in middleware**, not inside route handlers, so the
  same rules could be reused across future routes without duplication.
- **The data layer is the only thing that "knows" about storage.** Routes
  never touch arrays directly — they call `store.getAllProjects()`, etc.
  This means swapping in PostgreSQL or MongoDB later only means rewriting
  `data/store.js`.
- **Every error response has the same shape** — `{ status, errors }` —
  so a frontend can handle all API errors with one code path.

## 🧭 Roadmap / next steps

- Connect this API to Project 1's contact form (replace the simulated
  submit in `script.js` with a real `fetch()` call to `POST /api/messages`)
- Add PUT/DELETE endpoints for full CRUD
- Swap the in-memory store for a real database (e.g. SQLite or MongoDB)
- Add authentication so `GET /api/messages` isn't publicly readable
- Add automated tests (a starter test script is wired up via `npm test`)

## 📄 License

MIT — see [LICENSE](LICENSE).
