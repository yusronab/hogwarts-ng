import { Component, effect, inject, untracked } from '@angular/core';
import { BaseInputTextComponent } from '../../../../shared/components/base-input-text/base-input-text.component';
import { BaseButtonComponent } from '../../../../shared/components/base-button/base-button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../auth/state/auth.selectors';
import { changePassword, editProfile } from '../../../auth/state/auth.actions';
import { BaseProfileImageUploaderComponent } from '../../../../shared/components/base-profile-image-uploader/base-profile-image-uploader.component';
import { getErrorMessage, isInvalid } from '../../../../core/utils';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BaseInputTextComponent,
    BaseButtonComponent,
    BaseProfileImageUploaderComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private alert = inject(AlertService);

  menu: 'account' | 'password' = 'account';

  form = this.fb.group({
    fullName: ['', Validators.required],
    username: ['', Validators.required],
    email: [{ value: '', disabled: true }],
    phone: ['', Validators.required],
    profileImage: [''],
  });

  formPassword = this.fb.group({
    oldPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  isInvalid = isInvalid;
  getErrorMessage = getErrorMessage;

  readonly user = this.store.selectSignal(selectUser);

  constructor() {
    effect(() => {
      const user = this.user();
      if (!user) return;

      untracked(() => {
        this.form.patchValue(
          {
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            phone: user.phone,
            profileImage: user.profileImage,
          },
          { emitEvent: false },
        );
      });
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    Object.entries(this.form.getRawValue()).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === 'undefined' ||
        value === 'null'
      ) {
        return;
      }
      formData.append(key, value);
    });

    const user = this.user();

    if (user) {
      this.store.dispatch(editProfile({ id: user.id, formData }));
    }
  }

  changeMenuTo(menu: 'account' | 'password') {
    if (menu === this.menu) return;

    this.formPassword.reset();
    this.menu = menu;
  }

  onSubmitPassword() {
    if (this.formPassword.invalid) {
      this.formPassword.markAllAsTouched();
      return;
    }

    this.alert.confirm({
      title: 'Konfirmasi',
      description: 'Apakah kamu yakin mengubah password?',
      textPositive: 'Yakin',
      onConfirm: () => {
        const { oldPassword, newPassword } = this.formPassword.getRawValue();
        if (!oldPassword || !newPassword) return;

        this.store.dispatch(changePassword({ oldPassword, newPassword }));
      },
    });
  }
}
