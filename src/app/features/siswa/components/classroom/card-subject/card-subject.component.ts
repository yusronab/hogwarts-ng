import { Component, computed, inject, input, Input } from '@angular/core';
import { Subject, User } from '../../../../../core/types';
import { BaseAvatarComponent } from '../../../../../shared/components/base-avatar/base-avatar.component';
import { Store } from '@ngrx/store';
import { selectSelectedSubjectId } from '../../../store/classroom/classroom.selector';
import {
  clearSelectedSubject,
  clearSubjectAttendance,
  loadSubjectAttendance,
  setSelectedSubjectId,
} from '../../../store/classroom/classroom.actions';

@Component({
  selector: 'app-card-subject',
  standalone: true,
  imports: [BaseAvatarComponent],
  templateUrl: './card-subject.component.html',
  styleUrl: './card-subject.component.css',
})
export class CardSubjectComponent {
  private store = inject(Store);

  subject = input.required<Omit<Subject, 'teacherId'> & { teachers: User[] }>();

  readonly selectedSubjectId = this.store.selectSignal(selectSelectedSubjectId);

  readonly isActive = computed(
    () => this.selectedSubjectId() === this.subject().id,
  );

  handleSelected() {
    if (this.subject().id === this.selectedSubjectId()) {
      this.store.dispatch(clearSelectedSubject());
      this.store.dispatch(clearSubjectAttendance())
      return;
    }

    this.store.dispatch(setSelectedSubjectId({ id: this.subject().id }));
    this.store.dispatch(loadSubjectAttendance({ id: this.subject().id }));
  }
}
