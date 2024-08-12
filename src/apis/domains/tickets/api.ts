import { del, get, put } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import { DeleteFormDataProps } from "@typings/deleteBookerFormatProps";
import { AxiosResponse } from "axios";

// 예매자 목록 조회 API (GET)
export interface getTicketReq {
  //memberId: number; //토큰이래요
  performanceId: number; //공연 아이디
  scheduleNumber?: string; //회차(FIRST, SECOND, THIRD)
  isPaymentCompleted?: boolean;
}

type TicketRetrieveResponse = components["schemas"]["TicketRetrieveResponse"];

export const getTicketRetrieve = async (
  formData: getTicketReq
): Promise<TicketRetrieveResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<TicketRetrieveResponse>> = await get(
      `tickets/${formData.performanceId}`
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
      "tickets",
      formData
    );

    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

// 예매자 삭제 API (DELETE)
//이거 타입 잘못되었을 수도..? bookingList 가 number를 담은 배열로 되어 있는데, 실제로는 아니었음
//export type TicketDeleteRequest = components["schemas"]["TicketDeleteRequest"];

export const deleteTicketDelete = async (
  formData: DeleteFormDataProps
): Promise<SuccessResponseVoid | null> => {
  // console.log("fromdata", formData);
  try {
    const response: AxiosResponse<ApiResponseType<SuccessResponseVoid>> = await del(
      "tickets",
      //DELETE요청의 경우 두번째 인자가 좀 다름. - config 파일을 넣어야 함
      { data: formData }
    );
    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
