import { createAction, props } from '@ngrx/store';
import {
  Meeting,
  Meta,
  MonthlyStatistic,
  Report,
  SubjectPercentage,
} from '../../../../core/types';

export const loadHomeData = createAction(
  '[Home] Load Home Data',
  props<{ date: string; page: number; limit: number }>(),
);

export const loadHomeDataSuccess = createAction(
  '[Home] Load Home Data Success',
  props<{
    meetings: Meeting[];
    reports: Report[];
    meta: Meta;
    subjectPercentage: SubjectPercentage;
    monthlyStatistic: MonthlyStatistic;
  }>(),
);

export const loadHomeDataFailure = createAction(
  '[Home] Load Home Data Failure',
  props<{ error: string }>(),
);

export const loadReportsData = createAction(
  '[Home] Load Reports Data',
  props<{ page: number; limit: number }>(),
);

export const loadReportsDataSuccess = createAction(
  '[Home] Load Reports Data Success',
  props<{
    reports: Report[];
    meta: Meta;
  }>(),
);

export const loadReportsDataFailure = createAction(
  '[Home] Load Reports Data Failure',
  props<{ error: string }>(),
);
