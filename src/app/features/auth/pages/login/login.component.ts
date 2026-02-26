import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth.actions';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BaseButtonComponent } from '../../../../shared/components/base-button/base-button.component';
import { BaseInputTextComponent } from '../../../../shared/components/base-input-text/base-input-text.component';
import { getErrorMessage, isInvalid } from '../../../../core/utils';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    BaseButtonComponent,
    BaseInputTextComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  loading$ = this.store.select((state: any) => state.auth.loading);

  isInvalid = isInvalid;
  getErrorMessage = getErrorMessage;

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.store.dispatch(
      AuthActions.login({ email: email!, password: password! }),
    );
  }
}
