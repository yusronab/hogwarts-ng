import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDetailMeeting } from '../../../store/classroom/classroom.selector';
import { BaseAvatarComponent } from '../../../../../shared/components/base-avatar/base-avatar.component';
import { buildExpiredAt } from '../../../../../core/utils';
import { CountdownMeetingComponent } from "../countdown-meeting/countdown-meeting.component";
import { DialogScannerComponent } from '../dialog-scanner/dialog-scanner.component';

@Component({
  selector: 'app-card-scan',
  standalone: true,
  imports: [BaseAvatarComponent, CountdownMeetingComponent, DialogScannerComponent],
  templateUrl: './card-scan.component.html',
  styleUrl: './card-scan.component.css',
})
export class CardScanComponent {
  private store = inject(Store);

  readonly detailMeeting = this.store.selectSignal(selectDetailMeeting);

  readonly expiredAt = computed(() => {
    const meeting = this.detailMeeting();
    if (!meeting) return null;

    return buildExpiredAt(meeting.date, meeting.schedule.hour_end);
  });
}
