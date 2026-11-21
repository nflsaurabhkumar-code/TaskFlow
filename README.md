# TaskFlow — Full-Stack Task Management App

TaskFlow is a MERN stack project. A user can register, create an organization (workspace), add projects and manage tasks.

## Tech stack

**Frontend:** React, Vite, React Router, Redux Toolkit, RTK Query, plain CSS
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, cookie-parser

## Features

- Register and login (password hashed with bcrypt)
- JWT saved in an HTTP-only cookie
- Protected routes on the frontend
- Organizations with admin and member roles
- Teams and projects (only admins can create them)
- Tasks: create, update status, delete, filter and pagination
- Central error handling

## Folder structure

```text
TaskFlow/
├── backend/src/
│   ├── config/          database connection
│   ├── constants/       roles
│   ├── controllers/
│   │   ├── auth/            registerController, loginController, sessionController
│   │   ├── organization/    create, list, get, listMembers
│   │   ├── team/            createTeam, listTeams
│   │   ├── project/         createProject, listProjects
│   │   └── task/            create, list, update, delete
│   ├── middleware/      auth, organization, error handling
│   ├── models/          User, Organization, OrganizationMember, Team, Project, Task
│   ├── routes/          authRoutes, organizationRoutes, teamRoutes, projectRoutes, taskRoutes
│   ├── utils/           ApiError, asyncHandler, response, authToken
│   ├── app.js
│   └── server.js
└── frontend/src/
    ├── app/             store.js
    ├── services/        baseApi + authApi, organizationApi, teamApi, projectApi, taskApi (RTK Query)
    ├── hooks/           useDashboard.js
    ├── components/
    │   ├── AuthLayout.jsx
    │   └── dashboard/   Sidebar, Topbar, Notice, EmptyWorkspace, WorkspaceBar,
    │                    StatsGrid, ProjectsPanel, TasksPanel, TaskItem
    ├── pages/           LoginPage, RegisterPage, Dashboard
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## How to run

You need Node.js and MongoDB (local, or a free MongoDB Atlas cluster).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env     # then edit .env and set MONGODB_URI and JWT_SECRET
npm run dev
```

The API runs on http://localhost:5000

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on http://localhost:5173 (Vite proxies `/api` to the backend).

## API routes

| Method | URL | Who | What it does |
|---|---|---|---|
| POST | /api/auth/register | public | create account |
| POST | /api/auth/login | public | login |
| POST | /api/auth/logout | public | logout |
| GET | /api/auth/me | logged in | current user |
| POST / GET | /api/organizations | logged in | create / list organizations |
| GET | /api/organizations/:id | member | one organization |
| GET | /api/organizations/:id/members | member | list members |
| POST / GET | /api/organizations/:id/teams | admin / member | create / list teams |
| POST / GET | /api/organizations/:id/projects | admin / member | create / list projects |
| POST / GET | /api/organizations/:id/tasks | member | create / list tasks |
| PATCH / DELETE | /api/organizations/:id/tasks/:taskId | member | update / delete task |

## What I learned

- Splitting code into small files (one job per file)
- JWT authentication with HTTP-only cookies
- Role based access (admin and member)
- RTK Query for API calls and caching
- Custom hooks to keep components small
