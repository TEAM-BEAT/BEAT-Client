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

// 예매자 입급 여부 수정 API (PUT)
/*
export interface putTicketReq {
  performanceId: number;
  performanceTitle: string;
  totalScheduleCoun: number;
  bookingList: BookingListProps[];
}
*/
export type TicketUpdateRequest = components["schemas"]["TicketUpdateRequest"];
type SuccessResponseVoid = components["schemas"]["SuccessResponseVoid"];

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

// 예매자 취소 API (PATCH)
//이거 타입 잘못되었을 수도..? bookingList 가 number를 담은 배열로 되어 있는데, 실제로는 아니었음
//export type TicketDeleteRequest = components["schemas"]["TicketDeleteRequest"];

export const patchTicketCancel = async (
  formData: PatchFormDataProps
): Promise<SuccessResponseVoid | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<SuccessResponseVoid>> = await patch(
      "tickets",
      formData
    );
    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
