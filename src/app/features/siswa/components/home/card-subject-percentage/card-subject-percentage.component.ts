import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSubjectPercentage } from '../../../store/home/home.selectors';
import { ChartOptions } from '../../../../../core/types';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-card-subject-percentage',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './card-subject-percentage.component.html',
  styleUrl: './card-subject-percentage.component.css',
})
export class CardSubjectPercentageComponent {
  private store = inject(Store);

  readonly records = this.store.selectSignal(selectSubjectPercentage);

  readonly charts = computed(() => {
    const data = this.records();
    if (!data) return [];

    return data.map((record) => ({
      ...record,
      chartOptions: {
        series: [record.percentage, 100 - record.percentage],
        chart: {
          type: 'donut',
          width: 80,
          height: 80,
          sparkline: { enabled: true },
        },
        labels: ['Hadir', 'Sisa'],
        plotOptions: {
          pie: {
            donut: {
              size: '70%',
            },
          },
        },
      } as ChartOptions,
    }));
  });
}
