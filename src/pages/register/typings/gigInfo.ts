import { Dayjs } from "dayjs";

export interface Schedule {
  performanceDate: Dayjs | null;
  totalTicketCount: string;
  scheduleNumber: string;
}

export interface Cast {
  castName: string;
  castRole: string;
  castPhoto: string;
}

export interface Staff {
  staffName: string;
  staffRole: string;
  staffPhoto: string;
}

export interface GigInfo {
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
  scheduleList: Schedule[];
  castList: Cast[];
  staffList: Staff[];
}
