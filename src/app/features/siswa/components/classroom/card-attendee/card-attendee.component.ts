import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDetailMeeting } from '../../../store/classroom/classroom.selector';
import { LucideAngularModule, RefreshCcw } from 'lucide-angular';
import { BaseButtonComponent } from '../../../../../shared/components/base-button/base-button.component';
import { loadClassroomDetailData } from '../../../store/classroom/classroom.actions';
import { BaseAvatarComponent } from '../../../../../shared/components/base-avatar/base-avatar.component';

@Component({
  selector: 'app-card-attendee',
  standalone: true,
  imports: [LucideAngularModule, BaseButtonComponent, BaseAvatarComponent],
  templateUrl: './card-attendee.component.html',
  styleUrl: './card-attendee.component.css',
})
export class CardAttendeeComponent {
  private store = inject(Store);

  readonly RefreshCcw = RefreshCcw;
  readonly detailMeeting = this.store.selectSignal(selectDetailMeeting);

  readonly attendance = computed(() => {
    const detail = this.detailMeeting();
    if (detail && detail.attendances.length > 0) {
      return detail?.attendances;
    }
    return [];
  });

  refreshMeeting() {
    const detail = this.detailMeeting();
    if (!detail) return;

    this.store.dispatch(loadClassroomDetailData({ id: detail.id }));
  }

  formatDateTime(date: string | null) {
    if (!date) return '-';

    return new Date(date).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  isCurrentUser(studentId: string) {
    const storage = localStorage.getItem('hw_user');
    const user = JSON.parse(storage || '');
    return user.id === studentId;
  }
}
