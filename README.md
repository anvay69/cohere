# Cohere Task Board

A full-stack task management app with a React + Vite frontend and a FastAPI backend.
It uses Clerk for authentication and authorization, SQLAlchemy for persistence, and a Kanban-style task board for org-scoped task management.

## Project structure

- `backend/` - FastAPI application, API routes, Clerk auth integration, and database models.
- `frontend/` - React + Vite client with Clerk-powered sign-in, sign-up, pricing, and a protected dashboard.

## Key features

- Authenticated, org-scoped task management
- Role-based permissions for viewing, creating, editing, and deleting tasks
- Kanban board UI with task columns for `pending`, `started`, and `completed`
- FastAPI REST API with SQLAlchemy-backed storage
- Clerk integration for session and org-based membership tracking

## Backend details

- `backend/app/main.py` - FastAPI application entry point
- `backend/app/api/tasks.py` - CRUD task endpoints
- `backend/app/core/auth.py` - Clerk-powered request authentication and permission checks
- `backend/app/core/database.py` - SQLAlchemy engine, session factory, and DB dependency
- `backend/app/models/task.py` - `Task` model with `TaskStatus` enum
- `backend/app/schemas/task.py` - Pydantic request/response schemas

## Frontend details

- `frontend/src/App.jsx` - route definitions and protected dashboard route
- `frontend/src/components/KanbanBoard.jsx` - task board UI and task operations
- `frontend/src/services/api.js` - authenticated API helpers
- `frontend/src/pages/` - home, sign-in, sign-up, pricing, and dashboard pages

## Prerequisites

- Python 3.13+
- Node.js 18+ and npm
- Clerk project and API keys
- A database URL (SQLite, PostgreSQL, etc.)

## Environment variables

### Backend (`backend/.env`)

```bash
CLERK_SECRET_KEY=
CLERK_PUBLIC_KEY=
CLERK_WEBHOOK_KEY=
CLERK_JWKS_URL=
DATABASE_URL=
FRONTEND_URL=
NGROK_PROXY_URL=
```

### Frontend

The frontend uses `VITE_API_URL` to locate the backend API.

```bash
VITE_API_URL=http://localhost:8000
```

## Setup

### Backend

```bash
cd backend
python -m pip install --upgrade pip
python -m pip install -e .
```

Then run the backend server:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the app in the browser at the address shown by Vite (usually `http://localhost:5173`).

## Usage

1. Create Clerk sign-in and sign-up pages.
2. Visit the home page and sign in.
3. Go to `/dashboard` to manage tasks.
4. Use the Kanban board to create, edit, or delete tasks if your membership role allows it.

## API

The backend exposes the following endpoints under `/api/tasks`:

- `GET /api/tasks` - list tasks for the current org
- `POST /api/tasks` - create a new task
- `GET /api/tasks/{task_id}` - fetch a single task
- `PUT /api/tasks/{task_id}` - update a task
- `DELETE /api/tasks/{task_id}` - delete a task

Task statuses are:

- `pending`
- `started`
- `completed`

## Notes

- The backend enforces org-based permissions (`org:tasks:view`, `org:tasks:create`, `org:tasks:edit`, `org:tasks:delete`).
- The frontend uses Clerk organization membership roles to determine whether task actions are available.
- `NGROK_PROXY_URL` is included for development behind ngrok and CORS allowances.

## License

No license specified.
