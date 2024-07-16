import { post } from "@apis/index";
import { components } from "@typings/api/schema";
import { ApiResponseType } from "@typings/commonType";
import { AxiosResponse } from "axios";

type LoginSuccessReponse = components["schemas"]["LoginSuccessResponse"];

export const postKakaoLogin = async (authCode: string): Promise<LoginSuccessReponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<LoginSuccessReponse>> = await post(
      `/users/sign-up?authorizationCode=${authCode}`,
      {
        socialType: "KAKAO",
      }
    );

    console.log("test");
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
