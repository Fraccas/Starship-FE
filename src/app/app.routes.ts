import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'docs',
    loadComponent: () =>
      import('./pages/docs/docs.component').then(m => m.DocsComponent)
  },

  {
    path: 'starships',
    loadComponent: () =>
      import('./pages/starships/starships.component').then(m => m.StarshipsComponent)
  },
  {
    path: 'favorites',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./pages/admin/admin.component').then(m => m.AdminComponent)
  }
];
