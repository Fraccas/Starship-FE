import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // isLoggedIn() now also checks expiration
  if (!auth.isLoggedIn() || !auth.isAdmin()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
