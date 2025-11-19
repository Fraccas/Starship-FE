import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.token();
  if (!token) return false;

  const payload = JSON.parse(atob(token.split('.')[1]));
  const roles = payload["role"] || payload["roles"];

  const isAdmin = Array.isArray(roles)
    ? roles.includes("Admin")
    : roles === "Admin";

  if (!isAdmin) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
