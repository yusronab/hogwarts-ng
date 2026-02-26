import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDetailMeeting } from '../../../store/classroom/classroom.selector';
import { BaseChipStatusComponent } from "../../../../../shared/components/base-chip-status/base-chip-status.component";

@Component({
  selector: 'app-card-general-info',
  standalone: true,
  imports: [BaseChipStatusComponent],
  templateUrl: './card-general-info.component.html',
  styleUrl: './card-general-info.component.css',
})
export class CardGeneralInfoComponent {
  private store = inject(Store);

  readonly detailMeeting = this.store.selectSignal(selectDetailMeeting);
}
