import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SiswaHomeApi } from '../../services/siswa-home.api';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  private actions$ = inject(Actions);
  private api = inject(SiswaHomeApi);

  loadHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadHomeData),
      switchMap(({ date, page, limit }) =>
        forkJoin({
          meetings: this.api.getTodayMeetings(date),
          reports: this.api.getReports(page, limit),
          subject: this.api.getSubjectPercentage(),
          monthly: this.api.getMonthlyStatistic(),
        }).pipe(
          map(({ meetings, reports, subject, monthly }) =>
            HomeActions.loadHomeDataSuccess({
              meetings: meetings.data,
              reports: reports.data.items,
              meta: reports.data.meta,
              subjectPercentage: subject.data,
              monthlyStatistic: monthly.data,
            }),
          ),
          catchError((err) =>
            of(HomeActions.loadHomeDataFailure({ error: err.message })),
          ),
        ),
      ),
    ),
  );

  loadReportsData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadReportsData),
      switchMap(({ page, limit }) =>
        forkJoin({
          reports: this.api.getReports(page, limit),
        }).pipe(
          map(({ reports }) =>
            HomeActions.loadReportsDataSuccess({
              reports: reports.data.items,
              meta: reports.data.meta,
            }),
          ),
          catchError((err) =>
            of(HomeActions.loadReportsDataFailure({ error: err.message })),
          ),
        ),
      ),
    ),
  );
}
