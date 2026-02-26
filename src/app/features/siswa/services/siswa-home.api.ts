import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Meeting,
  Meta,
  MonthlyStatistic,
  Report,
  SubjectPercentage,
} from '../../../core/types';
import { baseUrl } from '../../../core/constants';

@Injectable({ providedIn: 'root' })
export class SiswaHomeApi {
  private http = inject(HttpClient);

  getTodayMeetings(date: string): Observable<{ data: Meeting[] }> {
    return this.http.get<{ data: Meeting[] }>(
      `${baseUrl}/meetings/student?date=${date}`,
    );
  }

  getReports(
    page = 1,
    limit = 5,
  ): Observable<{
    data: {
      items: Report[];
      meta: Meta;
    };
  }> {
    return this.http.get<{
      data: {
        items: Report[];
        meta: Meta;
      };
    }>(`${baseUrl}/reports/student?page=${page}&limit=${limit}`);
  }

  getSubjectPercentage(): Observable<{ data: SubjectPercentage }> {
    return this.http.get<{ data: SubjectPercentage }>(
      `${baseUrl}/attendance/my/subject-percentage`,
    );
  }

  getMonthlyStatistic(): Observable<{ data: MonthlyStatistic }> {
    return this.http.get<{ data: MonthlyStatistic }>(
      `${baseUrl}/attendance/my/monthly`,
    );
  }
}
