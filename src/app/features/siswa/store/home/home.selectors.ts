import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.state';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectMeetings = createSelector(
  selectHomeState,
  (state) => state.meetings,
);

export const selectReports = createSelector(
  selectHomeState,
  (state) => state.reports,
);

export const selectReportsMeta = createSelector(
  selectHomeState,
  (state) => state.meta,
);

export const selectSubjectPercentage = createSelector(
  selectHomeState,
  (state) => state.subjectPercentage?.records,
);

export const selectMonthlyStatistic = createSelector(
  selectHomeState,
  (state) => state.monthlyStatistic?.records,
);

export const selectLoading = createSelector(
  selectHomeState,
  (state) => state.loading,
);
