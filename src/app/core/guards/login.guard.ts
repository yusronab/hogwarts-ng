import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('hw_user') || '{}');

  // kalau belum login → boleh masuk login
  if (!user?.role) {
    return true;
  }

  // kalau sudah login → redirect sesuai role
  switch (user.role) {
    case 'Admin':
      return router.createUrlTree(['/admin']);
    case 'Siswa':
      return router.createUrlTree(['/home']);
    default:
      return router.createUrlTree(['/teacher']);
  }
};
