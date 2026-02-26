import { Component, DestroyRef, inject, Input } from '@angular/core';

@Component({
  selector: 'app-countdown-meeting',
  standalone: true,
  imports: [],
  templateUrl: './countdown-meeting.component.html',
  styleUrl: './countdown-meeting.component.css',
})
export class CountdownMeetingComponent {
  @Input() expiredAt: Date | null = null;

  private destroyRef = inject(DestroyRef);

  remaining = '';
  private interval: any;

  ngOnInit() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);

    this.destroyRef.onDestroy(() => {
      clearInterval(this.interval);
    });
  }

  update() {
    if (!this.expiredAt) {
      this.remaining = '-';
      return;
    }

    const diff = this.expiredAt.getTime() - Date.now();

    if (diff <= 0) {
      this.remaining = 'Telah berakhir';
      clearInterval(this.interval);
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.remaining = `${hours}j ${minutes}m ${seconds}d`;
  }
}
