import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadHomeData } from '../../store/home/home.actions';
import { selectLoading, selectMeetings } from '../../store/home/home.selectors';
import { AsyncPipe } from '@angular/common';
import { LucideAngularModule, InfoIcon } from 'lucide-angular';
import { CardTodayMeetingComponent } from '../../components/home/card-today-meeting/card-today-meeting.component';
import { CardSubjectPercentageComponent } from '../../components/home/card-subject-percentage/card-subject-percentage.component';
import { CardMonthlyStatisticComponent } from '../../components/home/card-monthly-statistic/card-monthly-statistic.component';
import { CardReportInfoComponent } from '../../components/home/card-report-info/card-report-info.component';
import { ScoreService } from '../../../../core/services/score.service';
import { BaseButtonComponent } from '../../../../shared/components/base-button/base-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    LucideAngularModule,
    CardTodayMeetingComponent,
    CardSubjectPercentageComponent,
    CardMonthlyStatisticComponent,
    CardReportInfoComponent,
    BaseButtonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly InfoIcon = InfoIcon;

  private store = inject(Store);
  private scoreService = inject(ScoreService);

  public gameScore$ = this.scoreService.scores$;
  runningSse = false;

  meeting$ = this.store.select(selectMeetings);
  loading$ = this.store.select(selectLoading);

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];

    this.store.dispatch(loadHomeData({ date: today, limit: 2, page: 1 }));
    this.start();
  }

  start() {
    this.runningSse = true;
    this.scoreService.startSocket();
  }

  stop() {
    this.runningSse = false;
    this.scoreService.stopSocket();
  }
}
