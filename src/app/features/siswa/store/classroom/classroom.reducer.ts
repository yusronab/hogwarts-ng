import { createReducer, on } from '@ngrx/store';
import { initialState } from './classroom.state';
import * as ClassroomActions from './classroom.actions';

export const classroomReducer = createReducer(
  initialState,

  on(ClassroomActions.loadClassroomDetailData, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ClassroomActions.loadClassroomDetailDataSuccess, (state, payload) => ({
    ...state,
    loading: false,
    detailMeeting: payload.detailMeeting,
  })),

  on(ClassroomActions.loadClassroomDetailDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(
    ClassroomActions.loadClassroomSubjectDataSuccess,
    (state, { subjects }) => ({
      ...state,
      loading: false,
      subjects: subjects,
    }),
  ),

  on(ClassroomActions.setSelectedSubjectId, (state, { id }) => ({
    ...state,
    selectedSubjectId: id,
  })),

  on(ClassroomActions.clearSelectedSubject, (state) => ({
    ...state,
    selectedSubjectId: null,
  })),

  on(ClassroomActions.setSubjectAttendance, (state, { data, meta }) => ({
    ...state,
    subjectAttendance: data,
    meta,
  })),

  on(ClassroomActions.clearSubjectAttendance, (state) => ({
    ...state,
    subjectAttendance: [],
  })),
);
