import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import { components } from "@typings/api/schema";
import { Dayjs } from "dayjs";

export interface Schedule {
  scheduleId?: number;
  performanceDate: Dayjs | null | string;
  totalTicketCount: number;
  dueDate?: number;
  scheduleNumber?: string;
}

export interface Cast {
  castId?: number;
  castName: string;
  castRole: string;
  castPhoto: string;
}

export interface Staff {
  staffId?: number;
  staffName: string;
  staffRole: string;
  staffPhoto: string;
}

export type BANK_TYPE = components["schemas"]["GuestBookingRetrieveResponse"]["bankName"];

export interface DataProps {
  userId: number;
  accountHolder: string;
  performanceId: number;
  performanceTitle: string;
  genre: SHOW_TYPE_KEY;
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
  ticketPrice: number;
  totalScheduleCount: number;
  isBookerExist: boolean;
  scheduleModifyRequests: Schedule[];
  castModifyRequests: Cast[];
  staffModifyRequests: Staff[];
}

export interface GigInfo {
  status: number;
  message: string;
  data: DataProps;
}
