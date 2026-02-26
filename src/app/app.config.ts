import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appReducer } from './core/state/app.reducer';
import { AppEffects } from './core/state/app.effects';
import { AuthEffects } from './features/auth/state/auth.effects';
import { authReducer } from './features/auth/state/auth.reducer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { homeReducer } from './features/siswa/store/home/home.reducer';
import { HomeEffects } from './features/siswa/store/home/home.effects';
import { classroomReducer } from './features/siswa/store/classroom/classroom.reducer';
import { ClassroomEffect } from './features/siswa/store/classroom/classroom.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      app: appReducer,
      auth: authReducer,
      home: homeReducer,
      classroom: classroomReducer,
    }),
    provideEffects([AppEffects, AuthEffects, HomeEffects, ClassroomEffect]),
  ],
};
