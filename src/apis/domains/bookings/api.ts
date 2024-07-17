import { get, post } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import { AxiosResponse } from "axios";

export type GuestBookingRequest = components["schemas"]["GuestBookingRequest"];
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

export const getGuestBookingList = async () => {
  try {
    const response = await get("/bookings/guest/retrieve");

    console.log(response.data);
    return response;
  } catch (error) {
    console.error("error", error);
  }
};
