import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const alert = inject(AlertService);

  const token = localStorage.getItem('hw_token');

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        alert.error({
          title: 'Session Expired',
          description: 'Silakan login kembali.',
          textPositive: 'Login',
          onConfirm: () => {
            localStorage.removeItem('hw_token');
            localStorage.removeItem('hw_user');
            router.navigate(['/login']);
          },
        });
      } else {
        const message =
          error.error?.message ||
          error.error?.error ||
          'Terjadi kesalahan pada server';

        alert.error({
          title: 'Gagal',
          description: message,
          textPositive: 'Tutup',
        });
      }

      return throwError(() => error);
    }),
  );
};
