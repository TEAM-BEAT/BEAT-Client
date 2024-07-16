import { get } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import { AxiosResponse } from "axios";

type HomeResponse = components["schemas"]["HomeResponse"];

// 1. API 요청 함수 작성 및 타입 추가
export const getAllScheduleList = async (): Promise<HomeResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<HomeResponse>> = await get("/main");

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
