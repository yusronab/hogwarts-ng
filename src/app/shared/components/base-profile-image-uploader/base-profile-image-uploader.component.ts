import { Component, forwardRef, signal } from '@angular/core';
import { baseImageUrl } from '../../../core/constants';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseButtonComponent } from "../base-button/base-button.component";
import { LucideAngularModule, User } from 'lucide-angular';

@Component({
  selector: 'app-base-profile-image-uploader',
  standalone: true,
  imports: [BaseButtonComponent, LucideAngularModule],
  templateUrl: './base-profile-image-uploader.component.html',
  styleUrl: './base-profile-image-uploader.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseProfileImageUploaderComponent),
      multi: true,
    },
  ],
})
export class BaseProfileImageUploaderComponent {
  previewUrl = signal<string | null>(null);
  removeImage = signal<boolean>(false);

  readonly UserIcon = User;

  private onChange: (value: File | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    if (value) {
      this.previewUrl.set(baseImageUrl + value);
    } else {
      this.previewUrl.set(null);
    }
  }

  registerOnChange(fn: (value: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      this.previewUrl.set(url);
      this.removeImage.set(false);
      this.onChange(file);
    }
  }

  handleRemove() {
    this.previewUrl.set(null);
    this.removeImage.set(true);
    this.onChange(null);
  }
}
