import { get } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
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
