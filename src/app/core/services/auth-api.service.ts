import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../constants';
import { LoginResponse } from '../../features/auth/models/auth.model';
import { User } from '../types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setUser } from '../../features/auth/state/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private http = inject(HttpClient);
  private store = inject(Store);

  login(payload: { email: string; password: string }) {
    return this.http.post<LoginResponse>(`${baseUrl}/auth/login`, payload);
  }

  getProfile(): Observable<{ data: User }> {
    const response = this.http.get<{ data: User }>(`${baseUrl}/auth/profile`);

    response.subscribe({
      next: ({ data }) => {
        this.store.dispatch(setUser({ user: data }));
        localStorage.setItem('hw_user', JSON.stringify(data));
      },
    });

    return response;
  }

  editProfile(userId: string, formData: FormData) {
    return this.http.patch<{ data: User }>(
      `${baseUrl}/users/${userId}`,
      formData,
    );
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.post<{ message: string }>(
      `${baseUrl}/auth/reset-password`,
      {
        oldPassword,
        newPassword,
      },
    );
  }
}
