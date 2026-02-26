import { Routes } from '@angular/router';
import { LayoutAdminComponent } from './shared/layouts/layout-admin/layout-admin.component';
import { LayoutSiswaComponent } from './shared/layouts/layout-siswa/layout-siswa.component';
import { LayoutGuruComponent } from './shared/layouts/layout-guru/layout-guru.component';
import { roleGuard } from './core/guards/role.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [roleGuard(['Admin'])],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
    ],
  },

  {
    path: 'home',
    component: LayoutSiswaComponent,
    canActivate: [roleGuard(['Siswa'])],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/siswa/pages/home/home.component').then(
            (m) => m.HomeComponent,
          ),
      },
    ],
  },
  {
    path: 'student-profile',
    component: LayoutSiswaComponent,
    canActivate: [roleGuard(['Siswa'])],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/siswa/pages/profile/profile.component').then(
            (m) => m.ProfileComponent,
          ),
      },
    ],
  },
  {
    path: 'classroom',
    component: LayoutSiswaComponent,
    canActivate: [roleGuard(['Siswa'])],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/siswa/pages/classroom/classroom.component').then(
            (m) => m.ClassroomComponent,
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/siswa/pages/classroom-detail/classroom-detail.component').then(
            (m) => m.ClassroomDetailComponent,
          ),
      },
    ],
  },

  {
    path: 'teacher',
    component: LayoutGuruComponent,
    canActivate: [roleGuard(['Teacher'])],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/guru/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
    ],
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
