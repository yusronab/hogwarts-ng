import {
  Attendance,
  DetailMeeting,
  Meeting,
  Meta,
  Subject,
  User,
} from '../../../../core/types';

export interface ClassroomState {
  meta: Meta | null;
  loading: boolean;
  error: string | null;
  detailMeeting: DetailMeeting | null;
  subjects: (Omit<Subject, 'teacherId'> & { teachers: User[] })[];
  subjectAttendance: (Meeting & {
    attendances: Attendance[];
  })[];
  selectedSubjectId: string | null;
}

export const initialState: ClassroomState = {
  meta: null,
  loading: false,
  error: null,
  detailMeeting: null,
  subjects: [],
  subjectAttendance: [],
  selectedSubjectId: null,
};
