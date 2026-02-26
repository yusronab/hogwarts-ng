import { Component, Input } from '@angular/core';
import { baseImageUrl } from '../../../core/constants';
import { LucideAngularModule, User } from 'lucide-angular';
import { CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-base-avatar',
  standalone: true,
  imports: [NgStyle, CommonModule, LucideAngularModule,],
  templateUrl: './base-avatar.component.html',
  styleUrl: './base-avatar.component.css',
})
export class BaseAvatarComponent {
  readonly User = User;

  @Input() image?: string | null = null;
  @Input() alt: string = 'Default Image';
  @Input() width: string = '40px';
  @Input() height: string = '40px';

  get styleVars() {
    return {
      width: this.width,
      height: this.height,
    };
  }

  get imageUrl() {
    return baseImageUrl + this.image;
  }
}
