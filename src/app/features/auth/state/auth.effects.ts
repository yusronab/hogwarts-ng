import * as AuthActions from './auth.actions';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AlertService } from '../../../core/services/alert.service';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../core/services/auth-api.service';
import { User } from '../../../core/types';

export class AuthEffects {
  private actions$ = inject(Actions);
  private alert = inject(AlertService);
  private router = inject(Router);
  private api = inject(AuthApiService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.api.login({ email, password }).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              token: response.data.access_token,
              user: response.data.user,
            }),
          ),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
        ),
      ),
    ),
  );

  editProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.editProfile),
      switchMap(({ id, formData }) =>
        this.api.editProfile(id, formData).pipe(
          map((response) =>
            AuthActions.editProfileSuccess({ user: response.data }),
          ),
          catchError((error) => of(AuthActions.editProfileFailure({ error }))),
        ),
      ),
    ),
  );

  editProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.editProfileSuccess),
        tap(({ user }) => {
          this.alert.success({
            title: 'Sukses',
            description: `Berhasil mengubah profile ${user.fullName}`,
            textPositive: 'Kembali',
            onConfirm: () => this.api.getProfile(),
          });
        }),
      ),
    { dispatch: false },
  );

  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.changePassword),
      switchMap(({ oldPassword, newPassword }) =>
        this.api.changePassword(oldPassword, newPassword).pipe(
          map((response) =>
            AuthActions.changePasswordSuccess({ message: response.message }),
          ),
          catchError((error) =>
            of(AuthActions.changePasswordFailure({ error })),
          ),
        ),
      ),
    ),
  );

  changePasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.changePasswordSuccess),
        tap(() => {
          this.alert.success({
            title: 'Sukses',
            description: 'Berhasil mengubah password. Silahkan login kembali',
            textPositive: 'OK',
            onConfirm: () => {
              localStorage.removeItem('hw_token');
              localStorage.removeItem('hw_user');
              this.router.navigate(['/login'], { replaceUrl: true });
            },
          });
        }),
      ),
    { dispatch: false },
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token, user }) => {
          this.alert.success({
            title: 'Login Berhasil',
            description: `Selamat datang kembali ${user.fullName}`,
            textPositive: 'Masuk',
            onConfirm: () => {
              localStorage.setItem('hw_token', token);
              localStorage.setItem('hw_user', JSON.stringify(user));

              if (user.role === 'Admin') {
                this.router.navigate(['/admin']);
              } else if (user.role === 'Siswa') {
                this.router.navigate(['/home']);
              } else {
                this.router.navigate(['/teacher']);
              }
            },
          });
        }),
      ),
    { dispatch: false },
  );
}
