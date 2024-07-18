import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { HOME_QUERY_KEY } from "../home/queries";
import {
  getBookingPerformanceDetail,
  getPerformanceDetail,
  getScheduleAvailable,
  postPerformance,
} from "./api";

export const QUERY_KEY = {
  DETAIL: "detail",
  BOOKING_DETAIL: "bookingDetail",
};

export const useGetPerformanceDetail = (performanceId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.DETAIL, performanceId],
    queryFn: () => getPerformanceDetail(performanceId),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetBookingPerformanceDetail = (performanceId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.BOOKING_DETAIL, performanceId],
    queryFn: () => getBookingPerformanceDetail(performanceId),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetScheduleAvailable = (scheduleId: number, purchaseTicketCount: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.DETAIL, scheduleId],
    queryFn: () => getScheduleAvailable(scheduleId, purchaseTicketCount),
    enabled: false,
  });
};

interface PerformanceFormData {
  posterImage: string;
  castList: {
    castPhoto: string;
    castName: string;
    castRole: string;
  }[];
  staffList: {
    staffPhoto: string;
    staffName: string;
    staffRole: string;
  }[];
  performanceTitle: string;
  genre: SHOW_TYPE_KEY;
  runningTime: number | null;
  performanceDescription: string;
  performanceAttentionNote: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  performanceTeamName: string;
  performanceVenue: string;
  performanceContact: string;
  performancePeriod: string;
  ticketPrice: number | null;
  totalScheduleCount: number;
  scheduleList: {
    performanceDate: Dayjs | Date | null | string;
    totalTicketCount: number | null;
    scheduleNumber: string;
  }[];
}

interface PerformanceResponse {
  status: number;
  data: {
    performanceId: number;
  };
}

const isPerformanceResponse = (res: any): res is PerformanceResponse => {
  return res && typeof res === "object" && "status" in res && "data" in res;
};

export const usePostPerformance = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: PerformanceFormData) => postPerformance(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [HOME_QUERY_KEY.LIST] });

      if (isPerformanceResponse(res) && res.status === 201) {
        navigate("/register-complete", {
          state: { performanceId: res.data.performanceId },
        });
      } else {
        console.error("Unexpected response type", res);
      }
    },
  });
};
