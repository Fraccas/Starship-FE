README.md
# Starship Explorer (Frontend)

This is the Angular frontend for **Starship Explorer**, an application for browsing, favoriting, and managing Star Wars–style starships. It connects to an ASP.NET Core Web API backend and uses modern Angular standalone components, JWT authentication, and a responsive UI with a starfield background.

---

## Features

### Authentication
- User registration and login  
- JWT-based authentication  
- Automatic token attachment via interceptor  
- Role support (User, Admin)

### Starships
- Fetch starship list from backend  
- Search and filter starships  
- Favorite/unfavorite starships  
- Detailed starship info

### Favorites Page
- Shows only the user’s saved favorites  
- Requires authentication  
- Uses backend-stored favorites

### Admin Page
- Admin-only route  
- View and manage user data (if enabled on backend)

### UI/UX
- Modern layout with responsive design  
- Glass-style navigation bar  
- Animated starfield background  
- Clean minimalist theme

---

## Tech Stack

### Frontend
- Angular 17+ (Standalone Components)
- TypeScript
- Vite
- SCSS
- Angular Router
- HttpClient + Interceptors

### Backend (Not included in this repo)
- ASP.NET Core Web API  
- Entity Framework Core  
- Identity + JWT  
- SQL Server  
- Models: Starship, FavoriteStarship

---

## Getting Started

### Install dependencies


npm install


### Run development server


ng serve


Application runs at:


http://localhost:4200


### Backend Requirements
The frontend expects the backend API to run at:


https://localhost:7045


---

## Environment Setup

Create:

`src/environments/environment.ts`
```ts
export const environment = {
  apiUrl: 'https://localhost:7045/api'
};

Project Structure
src/
 ├── app/
 │   ├── components/
 │   │   └── navbar/
 │   ├── pages/
 │   │   ├── home/
 │   │   ├── login/
 │   │   ├── register/
 │   │   ├── starships/
 │   │   ├── favorites/
 │   │   └── admin/
 │   ├── services/
 │   ├── guards/
 │   └── app.routes.ts
 ├── styles.scss
 └── index.html

Authentication Flow

User logs in

Backend returns JWT

Token stored in localStorage

Interceptor attaches Authorization: Bearer <token>

Guards protect authenticated/admin routes

Navbar updates based on login state

Testing
ng test