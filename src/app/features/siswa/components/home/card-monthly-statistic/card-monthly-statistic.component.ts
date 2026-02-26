import { Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMonthlyStatistic } from '../../../store/home/home.selectors';
import { BarChartOptions } from '../../../../../core/types';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-card-monthly-statistic',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './card-monthly-statistic.component.html',
  styleUrl: './card-monthly-statistic.component.css',
})
export class CardMonthlyStatisticComponent {
  private store = inject(Store);

  readonly records = this.store.selectSignal(selectMonthlyStatistic);

  readonly barChart = computed<BarChartOptions | null>(() => {
    const data = this.records();
    if (!data) return null;

    return {
      series: [
        {
          name: 'Hadir',
          data: data.map((m) => m.present ?? 0),
        },
        {
          name: 'Sakit',
          data: data.map((m) => m.sick ?? 0),
        },
        {
          name: 'Izin',
          data: data.map((m) => m.excused ?? 0),
        },
        {
          name: 'Alfa',
          data: data.map((m) => m.absent ?? 0),
        },
        {
          name: 'Terlambat',
          data: data.map((m) => m.late ?? 0),
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: false,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: data.map((m) => m.month),
      },
      legend: {
        position: 'top',
      },
    };
  });
}
