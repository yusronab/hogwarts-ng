import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';

export interface AppState {
  theme: 'light' | 'dark';
}

export const initialState: AppState = {
  theme: 'dark',
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.setTheme, (state, { theme }) => ({
    ...state,
    theme,
  })),
);
