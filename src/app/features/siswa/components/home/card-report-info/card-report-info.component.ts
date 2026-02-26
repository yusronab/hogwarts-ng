import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectReports,
  selectReportsMeta,
} from '../../../store/home/home.selectors';
import { BaseChipStatusComponent } from '../../../../../shared/components/base-chip-status/base-chip-status.component';
import { loadReportsData } from '../../../store/home/home.actions';
import { BaseButtonComponent } from '../../../../../shared/components/base-button/base-button.component';

@Component({
  selector: 'app-card-report-info',
  standalone: true,
  imports: [BaseChipStatusComponent, BaseButtonComponent],
  templateUrl: './card-report-info.component.html',
  styleUrl: './card-report-info.component.css',
})
export class CardReportInfoComponent {
  private store = inject(Store);

  readonly reports = this.store.selectSignal(selectReports);
  readonly meta = this.store.selectSignal(selectReportsMeta);

  readonly pages = computed(() => {
    const meta = this.meta();
    if (!meta) return [];
    return Array.from({ length: meta.totalPages }, (_, i) => i + 1);
  });

  changePage(page: number) {
    const meta = this.meta();
    if (!meta) return;

    this.store.dispatch(loadReportsData({ page, limit: meta.itemsPerPage }));
  }

  isActive(page: number) {
    return this.meta()?.currentPage === page;
  }
}
