import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['expectedRoles'] as string[];
  const userRole = authService.getRole();

  if (authService.isLoggedIn() && userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  if (authService.isLoggedIn()) {
    if (userRole === 'ADMIN') router.navigate(['/admin']);
    else if (userRole === 'ENTRENADOR') router.navigate(['/entrenador']);
    else if (userRole === 'MIEMBRO') router.navigate(['/miembro']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};
