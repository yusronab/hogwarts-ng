import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadClassroomSubjectData } from '../../store/classroom/classroom.actions';
import { selectSubjects } from '../../store/classroom/classroom.selector';
import { CardSubjectComponent } from '../../components/classroom/card-subject/card-subject.component';
import { TableAttendanceComponent } from '../../components/classroom/table-attendance/table-attendance.component';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [CardSubjectComponent, TableAttendanceComponent],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css',
})
export class ClassroomComponent {
  private store = inject(Store);

  readonly subjects = this.store.selectSignal(selectSubjects);

  ngOnInit() {
    this.store.dispatch(loadClassroomSubjectData());
  }
}
