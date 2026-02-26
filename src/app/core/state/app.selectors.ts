import { createSelector } from '@ngrx/store';

export const selectApp = (state: any) => state.app;

export const selectTheme = createSelector(selectApp, (state) => state.theme);
