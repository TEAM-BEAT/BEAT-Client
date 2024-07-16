import { get } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import { AxiosResponse } from "axios";

type BookingPerformanceDetailResponse = components["schemas"]["BookingPerformanceDetailResponse"];

export const getBookingPerformanceDetail = async (
  performanceId: number
): Promise<BookingPerformanceDetailResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<BookingPerformanceDetailResponse>> = await get(
      `/performances/detail/${performanceId}`
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

type TicketAvailabilityResponse = components["schemas"]["TicketAvailabilityResponse"];

export const getScheduleAvailable = async (
  scheduleId: number,
  purchaseTicketCount: number
): Promise<TicketAvailabilityResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<TicketAvailabilityResponse>> = await get(
      `/schedules/${scheduleId}/availability?purchaseTicketCount=${purchaseTicketCount}`
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
