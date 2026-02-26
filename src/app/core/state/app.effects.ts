import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  constructor() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    media.addEventListener('change', (event) => {
      const savedTheme = localStorage.getItem('app_theme');

      // if (savedTheme === 'light' || savedTheme === 'dark') {
      //   return;
      // }

      const newTheme = event.matches ? 'dark' : 'light';
      this.store.dispatch(AppActions.setTheme({ theme: newTheme }));
    });
  }

  setTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.setTheme),
        tap(({ theme }) => {
          localStorage.setItem('app_theme', theme);
          this.applyTheme(theme);
        }),
      ),
    { dispatch: false },
  );

  private applyTheme(theme: 'light' | 'dark') {
    const html = document.documentElement;

    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
