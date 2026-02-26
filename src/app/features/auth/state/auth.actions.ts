import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/types';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; token: string }>(),
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>(),
);

export const setUser = createAction('[Auth] Set User', props<{ user: User }>());

export const editProfile = createAction(
  '[Auth] Edit Profile',
  props<{ id: string; formData: FormData }>(),
);

export const editProfileSuccess = createAction(
  '[Auth] Edit Profile Success',
  props<{ user: User }>(),
);

export const editProfileFailure = createAction(
  '[Auth] Edit Profile Failure',
  props<{ error: string }>(),
);

export const changePassword = createAction(
  '[Auth] Change Password',
  props<{ oldPassword: string; newPassword: string }>(),
);

export const changePasswordSuccess = createAction(
  '[Auth] Change Password Success',
  props<{ message: string }>(),
);

export const changePasswordFailure = createAction(
  '[Auth] Change Password Failure',
  props<{ error: string }>(),
);
