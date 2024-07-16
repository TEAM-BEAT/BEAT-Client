import { useQuery } from "@tanstack/react-query";
import { getBookingPerformanceDetail, getScheduleAvailable } from "./api";

export const QUERY_KEY = {
  DETAIL: "detail",
};

export const useGetBookingPerformanceDetail = (performanceId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.DETAIL, performanceId],
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
