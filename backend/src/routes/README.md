Routes are mounted from `src/app.js`.

- `authRoutes.js` – register, login, logout (public) and `/me` (needs login)
- `organizationRoutes.js` – needs login. It also mounts the routes below
  under `/api/organizations/:organizationId/...`
- `teamRoutes.js`, `projectRoutes.js` – members can view, only admins can create
- `taskRoutes.js` – every member of the organization can use tasks
