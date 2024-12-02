import { get, patch, put } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import { PatchFormDataProps } from "@typings/deleteBookerFormatProps";
import { AxiosResponse } from "axios";
import { convertingScheduleNumber } from "@constants/convertingScheduleNumber";

// 예매자 목록 조회 API (GET)
export interface getTicketReq {
  //memberId: number; //토큰이래요
  performanceId: number; //공연 아이디
  scheduleNumber?: string; //회차(FIRST, SECOND, THIRD)
  isPaymentCompleted?: boolean;
}

type TicketRetrieveResponse = components["schemas"]["TicketRetrieveResponse"];

export const getTicketRetrieve = async (
  formData: getTicketReq,
  filterList
): Promise<TicketRetrieveResponse | null> => {
  try {
    const params = new URLSearchParams();
    filterList.scheduleNumber.map((item) =>
      params.append("scheduleNumber", convertingScheduleNumber(item))
    );
    filterList.bookingStatus.map((item) => params.append("bookingStatus", item));

    const response: AxiosResponse<ApiResponseType<TicketRetrieveResponse>> = await get(
      `tickets/${formData.performanceId}?${params.toString()}`
    );

    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const getTicketRetrieveSearch = async (
  formData: getTicketReq,
  searchWord,
  filterList
): Promise<TicketRetrieveResponse | null> => {
  try {
    const params = new URLSearchParams();
    params.append("searchWord", searchWord);
    filterList.scheduleNumber.map((item) =>
      params.append("scheduleNumber", convertingScheduleNumber(item))
    );
    filterList.bookingStatus.map((item) => params.append("bookingStatus", item));

    const response: AxiosResponse<ApiResponseType<TicketRetrieveResponse>> = await get(
      `tickets/search/${formData.performanceId}?${params.toString()}`
    );

    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

type SuccessResponseVoid = components["schemas"]["SuccessResponseVoid"];

// 예매자 입급 여부 수정 API (PUT)

export type TicketUpdateRequest = components["schemas"]["TicketUpdateRequest"];

//async 함수는 항상 promise로 감싸서 값을 리턴한다.
//즉, 비동기 함수의 값을 사용하려면 추후 await이나 then 을 사용해야 한다던데..
//이해가 잘 안가는걸 보니 아직 프로미스에 대한 개념 부족이라 판단됨
export const putTicketUpdate = async (
  formData: TicketUpdateRequest
): Promise<SuccessResponseVoid | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<SuccessResponseVoid>> = await put(
      "tickets/update",
      formData
    );

    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

// 예매자 환불처리 (PUT)

export type TicketRefundRequest = components["schemas"]["TicketRefundRequest"];

export const putTicketRefund = async (
  formData: TicketRefundRequest
): Promise<SuccessResponseVoid | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<SuccessResponseVoid>> = await put(
      "tickets/refund",
      formData
    );

    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

// 예매자 삭제 (PUT)

export type TicketDeleteRequest = components["schemas"]["TicketDeleteRequest"];

export const putTicketDelete = async (
  formData: TicketDeleteRequest
): Promise<SuccessResponseVoid | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<SuccessResponseVoid>> = await put(
      "tickets/delete",
      formData
    );

    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
