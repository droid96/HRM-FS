# HR Figma Fullstack (Login + HR Dashboard + MongoDB)

## Backend

- Folder: `server`
- Stack: Node.js + Express + MongoDB (Mongoose)
- Endpoints:
  - `GET /api/health`
  - `POST /api/auth/seed`  -> seeds `admin@example.com` / `password123`
  - `POST /api/auth/login` -> checks credentials and returns JWT (not yet used on frontend)

### Run backend

```bash
cd server
npm install
npm run dev
```

Then (once) seed the admin user:

```bash
curl -X POST http://localhost:4000/api/auth/seed
```

## Frontend

- Folder: `web`
- Based on your Figma HR dashboard + login designs.
- Routes:
  - `/login` -> Figma login page
  - `/hr`    -> Figma HR dashboard (Dashboard as admin home)

### Run frontend

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:5173/login` and log in with:

- email: `admin@example.com`
- password: `password123`

On success, you are redirected to `/hr`, which shows the full HR dashboard UI.
