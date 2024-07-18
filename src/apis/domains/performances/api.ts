import { del, get } from "@apis/index";
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

// 공연 수정 페이지 정보 조회 API (GET)
type PerformanceEditResponse = components["schemas"]["PerformanceEditResponse"];

export const getPerformanceEdit = async (
  performanceId: number
): Promise<PerformanceEditResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<PerformanceEditResponse>> = await get(
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

export const deletePerformance = async (
  performanceId: number
): Promise<SuccessResponseVoid | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<SuccessResponseVoid>> = await del(
      `performances/${performanceId}`
    );
    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
