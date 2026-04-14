export interface User {
  id: string;
  name: string;
  email: string;
  congregation: string | null;
  createdAt: string;
}

export interface Log {
  id: string;
  date: string;
  hours: number;
  returnVisits: number;
  bibleStudies: number;
  notes: string | null;
  createdAt: string;
}

export interface WeeklyData {
  name: string;
  hours: number;
  returnVisits: number;
  bibleStudies: number;
}

export interface MonthlyStats {
  totalHours: number;
  totalReturnVisits: number;
  totalBibleStudies: number;
  totalLogs: number;
  averageHoursPerLog: number;
}
