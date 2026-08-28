import { get, patch, post } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import { AxiosError, AxiosResponse } from "axios";

export type GuestBookingRequest = components["schemas"]["GuestBookingRequest"];

type GuestBookingResponse = components["schemas"]["GuestBookingResponse"];

// 1. API 요청 함수 작성 및 타입 추가
// 실패 시 null이 아닌 예외를 던진다 — 호출부(Book.tsx)의 상태코드 분기 alert가 동작하도록.
export const postGuestBook = async (
  formData: GuestBookingRequest
): Promise<GuestBookingResponse> => {
  const response: AxiosResponse<ApiResponseType<GuestBookingResponse>> = await post(
    "/bookings/guest",
    formData
  );

  return response.data.data;
};

// 비회원 예매 조회 API

type GuestBookingRetrieveRequest = components["schemas"]["GuestBookingRetrieveRequest"];
type GuestBookingRetrieveResponse = components["schemas"]["GuestBookingRetrieveResponse"];

export const postGuestBookingList = async (
  formData: GuestBookingRetrieveRequest
): Promise<GuestBookingRetrieveResponse[] | null | 404> => {
  try {
    const response: AxiosResponse<ApiResponseType<GuestBookingRetrieveResponse[]>> = await post(
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
    const response: AxiosResponse<ApiResponseType<MemberBookingRetrieveResponse[]>> = await get(
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

// 예매 취소
export type BookingCancelRequest = components["schemas"]["BookingCancelRequest"];
export type BookingCancelResponse = components["schemas"]["BookingCancelResponse"];

export const patchCancelBook = async (
  formData: BookingCancelRequest
): Promise<BookingCancelResponse> => {
  const response: AxiosResponse<ApiResponseType<BookingCancelResponse>> = await patch(
    "/bookings/cancel",
    formData
  );
  return response.data.data;
};

// 예매 환불 신청
export type BookingRefundRequest = components["schemas"]["BookingRefundRequest"];
export type BookingRefundResponse = components["schemas"]["BookingRefundResponse"];

export const patchRefundBook = async (
  formData: BookingRefundRequest
): Promise<BookingRefundResponse> => {
  const response: AxiosResponse<ApiResponseType<BookingRefundResponse>> = await patch(
    "/bookings/refund",
    formData
  );
  return response.data.data;
};
