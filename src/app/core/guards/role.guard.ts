import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['expectedRoles'] as string[];
  const userRole = authService.getRole();

  if (authService.isLoggedIn() && userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  if (authService.isLoggedIn()) {
    if (userRole === 'ADMIN') {
      return router.createUrlTree(['/admin']);
    }
    else if (userRole === 'ENTRENADOR') {
      return router.createUrlTree(['/entrenador']);
    }
    else if (userRole === 'MIEMBRO') {
      return router.createUrlTree(['/miembro']);
    }
    return false;
  }

  return router.createUrlTree(['/login']);
};
