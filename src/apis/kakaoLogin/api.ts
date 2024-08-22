import { post } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import { AxiosResponse } from "axios";

type SuccessResponseVoid = components["schemas"]["SuccessResponseVoid"];

export const postLogout = async (): Promise<SuccessResponseVoid | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<SuccessResponseVoid>> =
      await post("/users/sign-out");

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
