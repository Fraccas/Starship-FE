# Starship Explorer (Frontend)

Angular single-page app for browsing, searching, and favoriting Star Wars–style starships. It consumes a companion ASP.NET Core Web API, uses JWT-based auth with role support, and ships with a responsive, glass-themed UI on top of an animated starfield.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Authentication Flow](#authentication-flow)
- [CI/CD Deployment](#cicd-deployment)

---

## Features
- **Authentication**: Registration, login, JWT storage, and automatic Authorization header injection via interceptor.
- **Role-aware routing**: Guards for authenticated users and admins.
- **Starship explorer**: Fetch, search, and filter starships with detail pages.
- **Favorites**: Save favorites to the backend and browse them in a dedicated page.
- **Admin area**: Admin-only route for managing user data (when enabled by the backend).
- **UI/UX**: Responsive layout, glassmorphism navigation bar, minimalist theme, and animated starfield background.

## Tech Stack
- Angular 19 (standalone components)
- TypeScript
- SCSS
- Angular Router & HttpClient
- JWT decode & interceptors

Backend (not included here): ASP.NET Core Web API with Entity Framework Core, Identity + JWT, and SQL Server.

## Prerequisites
- Node.js 20+
- npm 10+
- Angular CLI (`npm install -g @angular/cli`) for local commands

## Quick Start
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Add environment configuration** (see [Environment Configuration](#environment-configuration)).
3. **Run the dev server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:4200`.
4. **Run unit tests**
   ```bash
   npm test
   ```
5. **Create a production build**
   ```bash
   npm run build
   ```

## Environment Configuration
Create `src/environments` with the following files:

`src/environments/environment.ts`
```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7045/api'
};
```

`src/environments/environment.prod.ts`
```ts
export const environment = {
  production: true,
  apiUrl: 'https://localhost:7045/api'
};
```

Update `apiUrl` to match your backend host/port for each deployment target.

## Available Scripts
- `npm start` – serve the app locally at `http://localhost:4200`.
- `npm run build` – create an optimized production build in `dist/`.
- `npm test` – execute unit tests with Karma/Jasmine.
- `npm run watch` – rebuild on file changes using the development configuration.

## Project Structure
```
src/
 ├── app/
 │   ├── core/          # guards, services, interceptors
 │   ├── pages/         # feature pages (home, login, register, starships, favorites, admin)
 │   └── shared/        # shared UI components
 ├── styles.scss        # global styles (starfield, layout, theme)
 └── main.ts            # Angular bootstrap
```

## Authentication Flow
1. User logs in or registers.
2. Backend returns a JWT.
3. Token is stored in `localStorage`.
4. An HTTP interceptor adds `Authorization: Bearer <token>` to API calls.
5. Guards verify authentication/admin roles before activating protected routes.
6. Navbar updates reactively based on the auth state.

## CI/CD Deployment
- **Workflow**: `.github/workflows/deploy.yml` builds the Angular app into a Docker image, tags it as `starshipui:latest`, pushes it to Azure Container Registry, then updates and restarts the Azure Web App container.
- **Trigger**: Pushes to the `main` branch.
- **Environment variables**: Set in the workflow for ACR name (`ACR_NAME`), resource group (`RESOURCE_GROUP`), and target web app name (`FRONTEND_APP`).
- **Required secret**: `AZURE_CREDENTIALS` (service principal JSON with access to ACR and the Web App). See the Azure Login GitHub Action docs for the expected schema.
- **Manual execution**: You can run the workflow from the Actions tab to force a redeploy; ensure the `main` branch has the desired code before dispatching.
