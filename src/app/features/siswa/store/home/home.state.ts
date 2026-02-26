import {
  Meeting,
  Meta,
  MonthlyStatistic,
  Report,
  SubjectPercentage,
} from '../../../../core/types';

export interface HomeState {
  meetings: Meeting[];
  reports: Report[];
  meta: Meta | null;
  subjectPercentage: SubjectPercentage | null;
  monthlyStatistic: MonthlyStatistic | null;
  loading: boolean;
  error: string | null;
}

export const initialState: HomeState = {
  meetings: [],
  reports: [],
  meta: null,
  subjectPercentage: null,
  monthlyStatistic: null,
  loading: false,
  error: null,
};
