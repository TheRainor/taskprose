# Taskprose

Cross-platform Todo application (Desktop, Web, Mobile) with a Node.js + MySQL backend. This repository contains the full source for the desktop app (Electron), web app (React + Vite), and mobile app (React Native / Expo), plus the server API and database migration script.

Also available in Turkish: [README.tr.md](./README.tr.md)

---

## Contents

- `desktop/` — Electron wrapper and build config for the desktop app
- `web/` — React web client (Vite)
- `mobile/` — React Native (Expo) mobile client
- `server/` — Express API, MySQL connection, controllers, and migration SQL

## Highlights

- JWT-based authentication with refresh tokens (cookies used for web)
- MySQL database with a schema and SQL dump (`server/taskprose_db.sql`)
- Multi-platform: desktop (Electron), web (Vite + React), mobile (Expo)
- Features: lists, tasks with priorities/alarms, comments, attachments, notifications

## Tech stack

- Backend: Node.js (ES modules), Express, MySQL (`mysql2/promise`)
- Auth: `jsonwebtoken`, cookie-based access/refresh tokens for web
- Desktop: Electron
- Web: React, Vite, Tailwind
- Mobile: React Native with Expo

## Quickstart (developer)

These commands assume you're on Windows PowerShell. Run them from the repository root and change into the relevant subfolder when needed.

1) Server (API + DB)

- Copy or create `server/.env` and fill your environment values (examples are in `server/.env`).
- Install dependencies, run the SQL migration, and start the server:

```powershell
cd server; npm install; npm run migrate; npm start
```

`npm run migrate` runs `node config/migrate.js` which loads `server/taskprose_db.sql` into the configured MySQL database.

2) Web (development)

```powershell
cd web; npm install; npm run dev
```

Open http://localhost:5173 (default Vite host). The web client uses cookies for web-platform auth flows.

3) Mobile (development)

```powershell
cd mobile; npm install; npm run start
```

This project uses Expo — follow the printed QR code or use the Expo Dev Tools to run on device/emulator.

4) Desktop (development)

```powershell
cd desktop; npm install; npm run start
```

The Electron app serves the `web/dist` build. To produce a desktop build, first build the web app (`cd web; npm run build`) then run the desktop build.

## Environment variables

Create and configure `.env` in `server/` (a sample is in `server/.env`). Important variables:

- `DB_HOST` — MySQL host
- `DB_USER` — MySQL user
- `DB_PASS` — MySQL password
- `DB_NAME` — MySQL database name
- `DB_PORT` — MySQL port (usually 3306)
- `JWT_ACCESS_SECRET` — secret for access tokens
- `JWT_REFRESH_SECRET` — secret for refresh tokens
- `JWT_ACCESS_EXPIRES_IN` — access token lifetime (e.g., `15m`)
- `JWT_REFRESH_EXPIRES_IN` — refresh token lifetime (e.g., `7d`)
- `WEB_PORT` — server port (default 3000)
- `NODE_ENV` — `development` or `production`

Security note: Do not commit secrets. Replace any demo secrets before deploying.

## Database

The server includes `server/taskprose_db.sql` containing schema definitions for tables such as `users`, `todos`, `lists`, `comments`, `attachments`, `notifications`, and `blacklisted_tokens`.

To load the schema locally:

1. Ensure your MySQL server is running and `.env` points to it.
2. From `server/`: `npm run migrate`.

## API overview

All API endpoints live under the `/api` prefix. Protected routes require a valid access token (cookie for web clients, Authorization header for others).

Auth
- POST /api/register — register a new user
- POST /api/login — login; accepts `platform` to set cookies for web
- POST /api/logout — logout and blacklist tokens
- POST /api/check-access — protected route to validate current user
- POST /api/refresh — exchange refresh token for new access token

Tasks
- POST /api/tasks?listId= — create a task (protected)
- PUT /api/update/tasks/:id — update task (protected)
- DELETE /api/delete/tasks/:id — delete task (protected)
- GET /api/tasks/all — get all tasks (protected)
- GET /api/tasks/today — tasks due today (protected)
- GET /api/tasks/important — important tasks (protected)
- GET /api/tasks/planned — planned tasks (protected)
- GET /api/tasks/completed — completed tasks (protected)
- GET /api/tasks/counts — counts per category (protected)

Lists
- POST /api/lists — create list (protected)
- GET /api/lists — get lists (protected)
- DELETE /api/delete/lists/:id — delete list (protected)
- GET /api/list/tasks?listId= — get tasks for a list (protected)
- GET /api/lists/counts — get counts for lists (protected)

Authentication notes
- For non-web clients (mobile/desktop) include `Authorization: Bearer <accessToken>`.
- For web, login with `platform: "w"` sets `jwt_access` and `jwt_refresh` cookies automatically.

## Development notes

- Desktop build packs `web/dist` into the Electron installer. Build order: web → desktop.
- The server uses `server/jobs/blacklist-cleanup-job.js` to prune expired blacklisted tokens.

## Troubleshooting

- DB connection errors: verify `.env` and MySQL remote access/credentials.
- Migration errors: ensure `server/taskprose_db.sql` exists and that the configured DB user has necessary privileges.

## Contributing

1. Fork and create a branch for your feature/fix.
2. Keep changes small and add tests when applicable.
3. Open a pull request with a clear description.

## Environment example files (what changed)

This project now includes example environment files for each platform in their respective folders. They are safe to commit (they contain placeholder values) and are intended as a developer-friendly starting point.

- `desktop/.env.example`
	- DEV_SERVER_URL=http://localhost:5173
	- NODE_ENV=development
	- Purpose: electron desktop build reads this at runtime to know where the local web build is during development.

- `web/.env.example`
	- VITE_API_URL=http://localhost:5000
	- Purpose: the React/Vite web client uses this to locate the API in development.

- `mobile/.env.example`
	- EXPO_PUBLIC_API_URL=http://10.0.2.2:5000
	- Purpose: expo/android emulator commonly uses `10.0.2.2` to reach host machine services. Change this if you run a different emulator or a physical device (use your machine/lan IP).

- `server/.env.example`
	- PORT=5000
	- CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
	- DB_HOST=localhost
	- DB_USER=root
	- DB_PASS=your_db_password_here
	- DB_NAME=taskprose_db
	- DB_PORT=3306
	- JWT_ACCESS_SECRET=your_jwt_access_secret_key_here
	- JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
	- JWT_ACCESS_EXPIRES_IN=15m
	- JWT_REFRESH_EXPIRES_IN=999d
	- NODE_ENV=development
	- Purpose: a secure, local-ready example for running the API server and performing migrations locally. Replace placeholders (DB_PASS, JWT secrets) with secure values in private `.env` before running on any network or production.

Recommendations & notes:

- Always copy the example file to an actual `.env` (for example `cp server/.env.example server/.env`) and fill secrets locally. Do not commit your real `.env`.
- For mobile testing on a physical device, set `EXPO_PUBLIC_API_URL` to your machine's LAN IP (for example `http://192.168.1.10:5000`). Emulators may require `10.0.2.2` (Android) or `localhost` variants for iOS simulators.
- `VITE_API_URL` and other client-side envs are baked into builds; after changing those values rebuild the web/mobile app.

## Documentation images

I added two placeholder images under `docs/images/` and showcased them here for quick reference. Replace these with production-ready screenshots and the official logo when available.

Logo:

![Taskprose logo](./docs/images/logo.png)

Screenshot (placeholder):

![Taskprose screenshot](./docs/images/screenshot.png)

---

[📥 Download Latest Version for Windows](https://github.com/TheRainor/taskprose/releases/tag/v1.0.0)
