import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'error' | 'confirm';

export interface AlertConfig {
  type: AlertType;
  title: string;
  description?: string;
  textPositive?: string;
  textNegative?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private _state = signal<AlertConfig & { isOpen: boolean }>({
    type: 'success',
    title: '',
    description: '',
    textPositive: 'OK',
    textNegative: 'Batal',
    isOpen: false,
  });

  state = this._state.asReadonly();

  open(config: AlertConfig) {
    this._state.set({
      ...config,
      textPositive: config.textPositive ?? 'OK',
      textNegative: config.textNegative ?? 'Batal',
      isOpen: true,
    });
  }

  close() {
    this._state.update((s) => ({ ...s, isOpen: false }));
  }

  success(config: Omit<AlertConfig, 'type'>) {
    this.open({ ...config, type: 'success' });
  }

  error(config: Omit<AlertConfig, 'type'>) {
    this.open({ ...config, type: 'error' });
  }

  confirm(config: Omit<AlertConfig, 'type'>) {
    this.open({ ...config, type: 'confirm' });
  }
}
