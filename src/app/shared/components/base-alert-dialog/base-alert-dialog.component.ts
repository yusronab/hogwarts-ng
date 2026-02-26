import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-base-alert-dialog',
  standalone: true,
  imports: [CommonModule, BaseButtonComponent],
  templateUrl: './base-alert-dialog.component.html',
  styleUrl: './base-alert-dialog.component.css',
})
export class BaseAlertDialogComponent {
  alert = inject(AlertService);

  get state() {
    return this.alert.state();
  }

  get iconPath(): string {
    switch (this.state.type) {
      case 'success':
        return 'icons/ic-success.svg';
      case 'confirm':
        return 'icons/ic-warning.svg';
      default:
        return 'icons/ic-error.svg';
    }
  }

  handleClose() {
    this.state.onCancel?.();
    this.alert.close();
  }

  handleConfirm() {
    this.state.onConfirm?.();
    this.alert.close();
  }
}
