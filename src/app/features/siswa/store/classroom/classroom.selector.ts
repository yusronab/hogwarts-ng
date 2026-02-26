import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClassroomState } from './classroom.state';

export const selectClassroomState =
  createFeatureSelector<ClassroomState>('classroom');

export const selectDetailMeeting = createSelector(
  selectClassroomState,
  (state) => state.detailMeeting,
);

export const selectSubjects = createSelector(
  selectClassroomState,
  (state) => state.subjects,
);

export const selectSelectedSubjectId = createSelector(
  selectClassroomState,
  (state) => state.selectedSubjectId,
);

export const selectSubjectAttendance = createSelector(
  selectClassroomState,
  (state) => state.subjectAttendance,
);

export const selectSubjectAttendanceMeta = createSelector(
  selectClassroomState,
  (state) => state.meta,
);
