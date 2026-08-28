import { del, get, post, put } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import axios, { AxiosResponse } from "axios";

// 회원이 등록한 공연 목록을 조회 API (GET)
export type MakerPerformanceResponse = components["schemas"]["MakerPerformanceResponse"];

export const getMakerPerformance = async (): Promise<MakerPerformanceResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<MakerPerformanceResponse>> =
      await get("performances/user");
    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

// 공연 수정 페이지 정보 조회 API (GET)
type PerformanceModifyDetailResponse = components["schemas"]["PerformanceModifyDetailResponse"];

export const getPerformanceEdit = async (
  performanceId: number
): Promise<PerformanceModifyDetailResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<PerformanceModifyDetailResponse>> = await get(
      `performances/${performanceId}`
    );
    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

// 공연 삭제 API (DELETE)
type SuccessResponseVoid = components["schemas"]["SuccessResponseVoid"];

export const deletePerformance = async (performanceId: number): Promise<SuccessResponseVoid> => {
  try {
    const response: AxiosResponse<SuccessResponseVoid> = await del(`performances/${performanceId}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

export type PerformanceDetailResponse = components["schemas"]["PerformanceDetailResponse"];

// 공연 상세정보 조회 API (GET)
export const getPerformanceDetail = async (
  performanceId: number
): Promise<PerformanceDetailResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<PerformanceDetailResponse>> = await get(
      `/performances/detail/${performanceId}`
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);

    throw new Error(error);
  }
};

type BookingPerformanceDetailResponse = components["schemas"]["BookingPerformanceDetailResponse"];

// 예매하기 관련 공연 정보 조회 API (GET)
export const getBookingPerformanceDetail = async (
  performanceId: number
): Promise<BookingPerformanceDetailResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<BookingPerformanceDetailResponse>> = await get(
      `/performances/booking/${performanceId}`
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

type TicketAvailabilityResponse = components["schemas"]["TicketAvailabilityResponse"];

// 회차별 티켓 예매 가능 여부 조회 API (GET)
export const getScheduleAvailable = async (
  scheduleId: number,
  purchaseTicketCount: number
): Promise<TicketAvailabilityResponse | number> => {
  try {
    const response: AxiosResponse<ApiResponseType<TicketAvailabilityResponse>> = await get(
      `/schedules/${scheduleId}/availability?purchaseTicketCount=${purchaseTicketCount}`
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);

    if (axios.isAxiosError(error)) {
      console.error("err is", error);
      const errorStatus = error.response?.data.status;
      console.log(errorStatus);

      return errorStatus;
    }
    return -1;
  }
};

export type PerformanceResponse = components["schemas"]["PerformanceResponse"];

export type PerformanceRequest = components["schemas"]["PerformanceRequest"];
export type PerformanceCreateResponse =
  components["schemas"]["SuccessResponsePerformanceResponse"];

// 공연 등록 API (POST)
export const postPerformance = async (
  formData: PerformanceRequest
): Promise<PerformanceCreateResponse> => {
  const response: AxiosResponse<PerformanceCreateResponse> = await post<PerformanceCreateResponse>(
    "/performances",
    formData
  );

  return response.data;
};

export type PerformanceModifyRequest = components["schemas"]["PerformanceModifyRequest"];
export type PerformanceModifyResponse =
  components["schemas"]["SuccessResponsePerformanceModifyResponse"];

// 공연 수정 API (PUT)
export const updatePerformance = async (
  formData: PerformanceModifyRequest
): Promise<PerformanceModifyResponse> => {
  const response: AxiosResponse<PerformanceModifyResponse> = await put<PerformanceModifyResponse>(
    "/performances",
    formData
  );

  return response.data;
};
