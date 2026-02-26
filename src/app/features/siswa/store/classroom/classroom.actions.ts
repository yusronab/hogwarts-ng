import { createAction, props } from '@ngrx/store';
import {
  Attendance,
  DetailMeeting,
  Meeting,
  Meta,
  Subject,
  User,
} from '../../../../core/types';

export const loadClassroomDetailData = createAction(
  '[ClassroomDetail] Load Data',
  props<{ id: string }>(),
);

export const loadClassroomDetailDataSuccess = createAction(
  '[ClassroomDetail] Load Data Success',
  props<{
    detailMeeting: DetailMeeting | null;
  }>(),
);

export const loadClassroomDetailDataFailure = createAction(
  '[ClassroomDetail] Load Data Failure',
  props<{ error: string }>(),
);

export const loadClassroomSubjectData = createAction(
  '[Classroom] Load Subject Data',
);

export const loadClassroomSubjectDataSuccess = createAction(
  '[Classroom] Load Subject Data Success',
  props<{
    subjects: (Omit<Subject, 'teacherId'> & { teachers: User[] })[];
  }>(),
);

export const loadClassroomSubjectDataFailure = createAction(
  '[Classroom] Load Subject Data Failure',
  props<{ error: string }>(),
);

export const setSelectedSubjectId = createAction(
  '[Classroom] Set Selected Subject Id',
  props<{ id: string }>(),
);

export const clearSelectedSubject = createAction(
  '[Classroom] Clear Selected Subject',
);

export const loadSubjectAttendance = createAction(
  '[Classroom] Load Subject Attendance Data',
  props<{ id: string }>(),
);

export const loadSubjectAttendanceFailure = createAction(
  '[Classroom] Load Subject Attendance Data Failure',
  props<{ error: string }>(),
);

export const setSubjectAttendance = createAction(
  '[Classroom] Set Attendance Subject',
  props<{
    data: (Meeting & {
      attendances: Attendance[];
    })[];
    meta: Meta;
  }>(),
);

export const clearSubjectAttendance = createAction(
  '[Classroom] Clear Attendance Subject',
);
