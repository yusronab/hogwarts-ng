import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Attendance,
  DetailMeeting,
  Meeting,
  Meta,
  Subject,
  User,
} from '../../../core/types';
import { baseUrl } from '../../../core/constants';

@Injectable({ providedIn: 'root' })
export class SiswaClassroomApi {
  private http = inject(HttpClient);

  getStudentSubject(): Observable<{
    data: (Omit<Subject, 'teacherId'> & { teachers: User[] })[];
  }> {
    return this.http.get<{
      data: (Omit<Subject, 'teacherId'> & { teachers: User[] })[];
    }>(`${baseUrl}/schedule/student/subjects`);
  }

  getMeetingById(id: string): Observable<{ data: DetailMeeting }> {
    return this.http.get<{ data: DetailMeeting }>(`${baseUrl}/meetings/${id}`);
  }

  getStudentAttendanceBySubjectId(id: string): Observable<{
    data: {
      items: (Meeting & {
        attendances: Attendance[];
      })[];
      meta: Meta;
    };
  }> {
    return this.http.get<{
      data: {
        items: (Meeting & {
          attendances: Attendance[];
        })[];
        meta: Meta;
      };
    }>(`${baseUrl}/meetings/subjects/${id}`);
  }

  scanQrCode(token: string) {
    return this.http.post(`/attendance/scan/${token}`, {});
  }
}
