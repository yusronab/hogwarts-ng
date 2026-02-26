import { createAction, props } from '@ngrx/store';

export const setTheme = createAction(
  '[App] Set Theme',
  props<{ theme: 'light' | 'dark' }>(),
);

export const loadTheme = createAction('[App] Load Theme');

export const setManualTheme = createAction(
  '[App] Set Manual Theme',
  props<{ theme: 'light' | 'dark' }>(),
);
