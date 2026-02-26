import { Component, computed, inject, input, Input } from '@angular/core';
import { Meeting } from '../../../../../core/types';
import { Router } from '@angular/router';
import { isCurrentMeeting } from '../../../../../core/utils';
import { BaseButtonComponent } from '../../../../../shared/components/base-button/base-button.component';
import { LucideAngularModule, Clock10Icon } from 'lucide-angular';

@Component({
  selector: 'app-card-today-meeting',
  standalone: true,
  imports: [BaseButtonComponent, LucideAngularModule],
  templateUrl: './card-today-meeting.component.html',
  styleUrl: './card-today-meeting.component.css',
})
export class CardTodayMeetingComponent {
  readonly Clock10Icon = Clock10Icon;
  private router = inject(Router);

  meeting = input.required<Meeting>();

  readonly isCurrent = computed(() =>
    isCurrentMeeting(
      this.meeting().schedule.hour_start,
      this.meeting().schedule.hour_end,
    ),
  );

  attend() {
    this.router.navigate(['/classroom', this.meeting().id]);
  }
}
