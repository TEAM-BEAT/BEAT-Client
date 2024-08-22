import { get, post } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import { AxiosError, AxiosResponse } from "axios";

export type GuestBookingRequest = components["schemas"]["GuestBookingRequest"];
// 비회원 예매 API
export interface postGuestReq {
  scheduleId: number;
  purchaseTicketCount: number;
  scheduleNumber: string;
  bookerName: string;
  bookerPhoneNumber: string;
  birthDate: string;
  password: string;
  totalPaymentAmount: number;
  isPaymentCompleted: boolean;
}

type GuestBookingResponse = components["schemas"]["GuestBookingResponse"];

// 1. API 요청 함수 작성 및 타입 추가
export const postGuestBook = async (
  formData: GuestBookingRequest
): Promise<GuestBookingResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<GuestBookingResponse>> = await post(
      "/bookings/guest",
      formData
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

// 비회원 예매 조회 API

export interface postGuestBookingReq {
  bookerName: string;
  birthDate: string;
  bookerPhoneNumber: string;
  password: string;
}

type GuestBookingRetrieveRequest = components["schemas"]["GuestBookingRetrieveRequest"];

export const postGuestBookingList = async (
  formData: postGuestBookingReq
): Promise<GuestBookingRetrieveRequest | null | 404> => {
  try {
    const response: AxiosResponse<ApiResponseType<GuestBookingRetrieveRequest>> = await post(
      "/bookings/guest/retrieve",
      formData
    );

    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 404) {
      return 404;
    }
    console.error("error", error);

    return null;
  }
};

// 회원 예매 조회 API

type MemberBookingRetrieveResponse = components["schemas"]["MemberBookingRetrieveResponse"];

export const getMemberBookingList = async () => {
  try {
    const response: AxiosResponse<ApiResponseType<MemberBookingRetrieveResponse>> = await get(
      "/bookings/member/retrieve"
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);

    return null;
  }
};

export type MemberBookingRequest = components["schemas"]["MemberBookingRequest"];
export type MemberBookingResponse = components["schemas"]["MemberBookingResponse"];

export const postMemberBook = async (
  formData: MemberBookingRequest
): Promise<MemberBookingResponse> => {
  const response: AxiosResponse<ApiResponseType<MemberBookingResponse>> = await post(
    "/bookings/member",
    formData
  );

  return response.data.data;
};
