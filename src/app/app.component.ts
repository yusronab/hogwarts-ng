import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseAlertDialogComponent } from './shared/components/base-alert-dialog/base-alert-dialog.component';
import { AlertService } from './core/services/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseAlertDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hogwarts-app';
  private deferredPrompt: any;

  constructor(private alert: AlertService) {}

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.deferredPrompt = event;

      this.showInstallConfirm();
    });
  }

  private showInstallConfirm() {
    this.alert.confirm({
      title: 'Install Aplikasi',
      description:
        'Tersedia versi Aplikasi, mau install aplikasi ini ke perangkat Anda?',
      textPositive: 'Install',
      onConfirm: () => {
        this.installApp();
      },
    });
  }

  private installApp() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();

    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      console.log(choiceResult.outcome);
      this.deferredPrompt = null;
    });
  }
}
