import { createReducer, on } from '@ngrx/store';
import { initialState } from './home.state';
import * as HomeActions from './home.actions';

export const homeReducer = createReducer(
  initialState,

  on(HomeActions.loadHomeData, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(HomeActions.loadHomeDataSuccess, (state, payload) => ({
    ...state,
    loading: false,
    meetings: payload.meetings,
    reports: payload.reports,
    meta: payload.meta,
    subjectPercentage: payload.subjectPercentage,
    monthlyStatistic: payload.monthlyStatistic,
  })),

  on(HomeActions.loadHomeDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(HomeActions.loadReportsData, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(HomeActions.loadReportsDataSuccess, (state, payload) => ({
    ...state,
    loading: false,
    reports: payload.reports,
    meta: payload.meta,
  })),

  on(HomeActions.loadReportsDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
