import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
  ApexLegend,
} from 'ng-apexcharts';

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  email: string;
  profileImage: string | null;
  username: string;
  gender: string | null;
  placeOfBirth: string | null;
  dateOfBirth: string | null;
  religion: string | null;
  phone: string | null;
  address: string | null;
  nip: string | null;
  title: string | null;
  educationLevel: string | null;
  subject: string | null;
  advisoryClass: string | null;
  nis: string | null;
  class: string | null;
  classId: string | null;
  parentName: string | null;
  parentPhone: string | null;
  role: string;
  status: string;
  lastLoginAt: string;
  classRelation: Classroom | null;
}

export interface Meeting {
  id: string;
  date: string;
  status: string;
  title: string;
  description: string;
  subject: Subject;
  teacher: User;
  schedule: Schedule;
  attendance: Attendance;
}

export interface Report {
  id: string;
  notes: string;
  reason: string;
  reportlevel: string;
  status: string;
  createdAt: string;
  teacher: User;
}

export interface Meta {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface Subject {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  category: string;
  teacherId: string;
}

export interface Classroom {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  level: string;
  room: string;
  description: string;
  capacity: number;
  advisorId: string;
}

export interface Schedule {
  id: string;
  createdAt: string;
  updatedAt: string;
  day: string;
  hour_start: string;
  hour_end: string;
  teacherId: string;
  classId: string;
  subjectId: string;
  class: Classroom;
  subject: Subject;
  teacher: User;
}

export interface Attendance {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  presentTime: null | string;
  meetingId: string;
  student: User;
  class: Classroom;
}

export interface DetailMeeting {
  id: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  title: string;
  description: string;
  scheduleId: string;
  teacherId: string;
  status: string;
  schedule: Schedule;
  attendances: Attendance[];
}

export interface SubjectPercentage {
  total: number;
  records: {
    subject: string;
    count: number;
    percentage: number;
  }[];
}

export interface MonthlyStatistic {
  total: number;
  records: {
    month: string;
    present: number;
    late: number;
    absent: number;
    sick: number;
    excused: number;
    null: number;
  }[];
}

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
};
