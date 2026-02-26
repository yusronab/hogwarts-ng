import {
  Component,
  DestroyRef,
  effect,
  inject,
  Input,
  signal,
} from '@angular/core';
import { BaseButtonComponent } from '../../../../../shared/components/base-button/base-button.component';
import { LucideAngularModule, ScanQrCode } from 'lucide-angular';
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'app-dialog-scanner',
  standalone: true,
  imports: [BaseButtonComponent, LucideAngularModule],
  templateUrl: './dialog-scanner.component.html',
  styleUrl: './dialog-scanner.component.css',
})
export class DialogScannerComponent {
  readonly ScanQrCode = ScanQrCode;

  @Input() disableScan = false;

  private destroyRef = inject(DestroyRef);

  open = signal(false);

  private html5QrCode: Html5Qrcode | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.stopScanner();
    });

    effect(() => {
      if (this.open()) {
        setTimeout(() => this.startScanner(), 0);
      } else {
        this.stopScanner();
      }
    });
  }

  async startScanner() {
    if (this.disableScan) return;

    this.html5QrCode = new Html5Qrcode('qr-reader');

    await this.html5QrCode.start(
      { facingMode: 'environment' },
      {
        fps: 10,
        qrbox: 250,
      },
      (decodedText) => {
        console.log('QR Code detected:', decodedText);

        this.stopScanner();
        this.open.set(false);
      },
      (errorMessage) => {
        // ignore scan error
      },
    );
  }

  async stopScanner() {
    if (this.html5QrCode) {
      await this.html5QrCode.stop();
      await this.html5QrCode.clear();
      this.html5QrCode = null;
    }
  }

  openDialog() {
    this.open.set(true);
  }

  closeDialog() {
    this.open.set(false);
  }
}
