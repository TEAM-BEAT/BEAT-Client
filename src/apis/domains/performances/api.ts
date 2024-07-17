import { get } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import { AxiosResponse } from "axios";

// 회원이 등록한 공연 목록을 조회 API (GET)
export type MakerPerformanceResponse = components["schemas"]["MakerPerformanceResponse"];
//export type MakerPerformanceDetail = components["schemas"]["MakerPerformanceDetail"];
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
