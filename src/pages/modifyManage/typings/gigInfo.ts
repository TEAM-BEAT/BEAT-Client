import { Dayjs } from "dayjs";

export interface Schedule {
  scheduleId?: number;
  performanceDate: Dayjs | null | string;
  totalTicketCount: number;
  dueDate?: number;
  scheduleNumber: string;
}

export interface Cast {
  castId: number;
  castName: string;
  castRole: string;
  castPhoto: string;
}

export interface Staff {
  staffId: number;
  staffName: string;
  staffRole: string;
  staffPhoto: string;
}

export interface DataProps {
  userId: number;
  performanceId: number;
  performanceTitle: string;
  genre: string;
  runningTime: number | null;
  performanceDescription: string;
  performanceAttentionNote: string;
  bankName: string;
  accountNumber: string;
  posterImage: string;
  performanceTeamName: string;
  performanceVenue: string;
  performanceContact: string;
  performancePeriod: string;
  ticketPrice: number | null;
  totalScheduleCount: number;
  isBookerExist: boolean;
  scheduleList: Schedule[];
  castList: Cast[];
  staffList: Staff[];
}

export interface GigInfo {
  status: number;
  message: string;
  data: DataProps;
}
