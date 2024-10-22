import { post } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import { AxiosResponse } from "axios";

type LoginSuccessResponse = components["schemas"]["LoginSuccessResponse"];

export const postKakaoLogin = async (authCode: string): Promise<LoginSuccessResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<LoginSuccessResponse>> = await post(
      `/users/sign-up?authorizationCode=${authCode}`,
      {
        socialType: "KAKAO",
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
