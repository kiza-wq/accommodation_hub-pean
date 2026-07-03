import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (routes, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.loadSession();
  if (!user) {
    return router.navigateByUrl('/');
  }
  return true;
};
