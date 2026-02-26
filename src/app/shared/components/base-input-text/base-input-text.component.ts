import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { LucideAngularModule, EyeIcon, EyeOffIcon } from 'lucide-angular';

@Component({
  selector: 'app-base-input-text',
  standalone: true,
  imports: [NgIf, FormsModule, LucideAngularModule],
  templateUrl: './base-input-text.component.html',
  styleUrls: ['./base-input-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseInputTextComponent),
      multi: true,
    },
  ],
})
export class BaseInputTextComponent implements ControlValueAccessor {
  readonly EyeIcon = EyeIcon;
  readonly EyeOffIcon = EyeOffIcon;

  @Input() label: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() error: boolean = false;
  @Input() helperText: string | string[] = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  value: string = '';
  showPassword = false;

  get isPassword() {
    return this.type === 'password';
  }

  get computedType() {
    return this.isPassword && this.showPassword ? 'text' : this.type;
  }

  // ===== ControlValueAccessor =====
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(value: string) {
    this.value = value;
    this.onChange(value);
  }
}
