import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SiswaClassroomApi } from '../../services/siswa-classroom.api';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import * as ClassroomActions from './classroom.actions';

@Injectable()
export class ClassroomEffect {
  private actions$ = inject(Actions);
  private api = inject(SiswaClassroomApi);

  loadClassroomDetailData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassroomActions.loadClassroomDetailData),
      switchMap(({ id }) =>
        forkJoin({
          meeting: this.api.getMeetingById(id),
        }).pipe(
          map(({ meeting }) =>
            ClassroomActions.loadClassroomDetailDataSuccess({
              detailMeeting: meeting.data,
            }),
          ),
          catchError((err) =>
            of(
              ClassroomActions.loadClassroomDetailDataFailure({
                error: err.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadClassroomSubjectData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassroomActions.loadClassroomSubjectData),
      switchMap(() =>
        this.api.getStudentSubject().pipe(
          map((response) =>
            ClassroomActions.loadClassroomSubjectDataSuccess({
              subjects: response.data,
            }),
          ),
          catchError((err) =>
            of(
              ClassroomActions.loadClassroomSubjectDataFailure({
                error: err.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadSubjectAttendance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClassroomActions.loadSubjectAttendance),
      switchMap(({ id }) =>
        this.api.getStudentAttendanceBySubjectId(id).pipe(
          map((response) =>
            ClassroomActions.setSubjectAttendance({
              data: response.data.items,
              meta: response.data.meta,
            }),
          ),
          catchError((err) =>
            of(
              ClassroomActions.loadSubjectAttendanceFailure({
                error: err.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
