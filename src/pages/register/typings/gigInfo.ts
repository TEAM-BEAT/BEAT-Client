import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import { Dayjs } from "dayjs";

export interface Schedule {
  performanceDate: Dayjs | null;
  totalTicketCount: number | null;
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

export interface PerformanceImage {
  id: number;
  performanceImage: string;
}

export interface GigInfo {
  performanceTitle: string;
  genre: SHOW_TYPE_KEY;
  runningTime: number | null;
  performanceDescription: string;
  performanceAttentionNote: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  posterImage: string;
  performanceImageList: PerformanceImage[];
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
