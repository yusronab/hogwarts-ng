import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const router = inject(Router);
    const user = JSON.parse(localStorage.getItem('hw_user') || '{}');

    if (!user?.role) {
      return router.createUrlTree(['/login']);
    }

    if (allowedRoles.includes(user.role)) {
      return true;
    }

    switch (user.role) {
      case 'Admin':
        return router.createUrlTree(['/admin']);
      case 'Siswa':
        return router.createUrlTree(['/home']);
      default:
        return router.createUrlTree(['/teacher']);
    }
  };
}
