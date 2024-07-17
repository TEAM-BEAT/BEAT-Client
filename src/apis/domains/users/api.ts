import { post } from "@apis/index";
import { ApiResponseType } from "@typings/commonType";
import { AxiosResponse } from "axios";

type LoginSuccessReponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    nickName: string;
  };
};

export const postKakaoLogin = async (authCode: string): Promise<LoginSuccessReponse | null> => {
  try {
    const response: AxiosResponse<ApiResponseType<LoginSuccessReponse>> = await post(
      `/users/sign-up?authorizationCode=${authCode}`,
      {
        socialType: "KAKAO",
      }
    );

    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};
