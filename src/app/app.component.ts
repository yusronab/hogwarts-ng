import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseAlertDialogComponent } from './shared/components/base-alert-dialog/base-alert-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseAlertDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hogwarts-app';
}
