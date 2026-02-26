import { Component, computed, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectSubjectAttendance,
  selectSubjectAttendanceMeta,
} from '../../../store/classroom/classroom.selector';
import { BaseChipStatusComponent } from '../../../../../shared/components/base-chip-status/base-chip-status.component';
import { BaseTableActionComponent } from '../../../../../shared/components/base-table-action/base-table-action.component';
import { Router } from '@angular/router';
import { formatDateTime } from '../../../../../core/utils';
import { LucideAngularModule, InfoIcon } from 'lucide-angular';

@Component({
  selector: 'app-table-attendance',
  standalone: true,
  imports: [
    BaseChipStatusComponent,
    BaseTableActionComponent,
    LucideAngularModule,
  ],
  templateUrl: './table-attendance.component.html',
  styleUrl: './table-attendance.component.css',
})
export class TableAttendanceComponent {
  private store = inject(Store);
  private router = inject(Router);

  readonly InfoIcon = InfoIcon;
  readonly attendances = this.store.selectSignal(selectSubjectAttendance);
  readonly meta = this.store.selectSignal(selectSubjectAttendanceMeta);

  readonly pagination = computed(() => {
    const meta = this.meta();
    if (!meta) return null;

    return {
      currentPage: meta.currentPage,
      totalPages: meta.totalPages,
    };
  });

  formatDateTime = formatDateTime;

  changePage(page: number) {
    // this.store.dispatch(loadSubjectAttendance({ page }));
  }

  navigateToDetail(id: string) {
    this.router.navigate(['/classroom', id]);
  }
}
