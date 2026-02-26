import { Component, inject, Input } from '@angular/core';
import { CardGeneralInfoComponent } from "../../components/classroom/card-general-info/card-general-info.component";
import { CardAttendeeComponent } from "../../components/classroom/card-attendee/card-attendee.component";
import { CardScanComponent } from "../../components/classroom/card-scan/card-scan.component";
import { Store } from '@ngrx/store';
import { loadClassroomDetailData } from '../../store/classroom/classroom.actions';

@Component({
  selector: 'app-classroom-detail',
  standalone: true,
  imports: [CardGeneralInfoComponent, CardAttendeeComponent, CardScanComponent],
  templateUrl: './classroom-detail.component.html',
  styleUrl: './classroom-detail.component.css',
})
export class ClassroomDetailComponent {
  @Input() id?: string;

  private store = inject(Store);

  ngOnInit() {
    this.store.dispatch(loadClassroomDetailData({ id: this.id || '' }))
  }
}
