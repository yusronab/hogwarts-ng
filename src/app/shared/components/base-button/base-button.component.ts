import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-base-button',
  standalone: true,
  imports: [NgIf, NgClass, NgStyle],
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.css'],
})
export class BaseButtonComponent {
  @Input() color: string = '#279b24';
  @Input() variant: 'contained' | 'outlined' | 'text' = 'contained';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() width: string = '100%';
  @Input() height: string = '48px';

  @Output() onClick = new EventEmitter<Event>();

  get styleVars() {
    return {
      '--btn-color': this.color,
      width: this.width,
      height: this.height,
    };
  }

  get isDisabled() {
    return this.disabled || this.loading;
  }
}
