import { QueryClient, useMutation } from "@tanstack/react-query";
import { postKakaoLogin } from "./api";
import { useAtom } from "jotai";
import { userAtom } from "@stores/user";
import { components } from "@typings/api/schema";

const QUERY_KEY = {
  KAKAO_LOGIN: "kakaoLogin",
};

type LoginSuccessReponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    nickName: string;
  };
};

export const usePostKakaoLogin = () => {
  const [, setUserData] = useAtom(userAtom);
  const queryClient = new QueryClient();

  return useMutation<LoginSuccessReponse | null, unknown, string>({
    mutationFn: (authCode: string) => postKakaoLogin(authCode),
    onSuccess: (response) => {
      if (response) {
        console.log("login success", response);

        const userData = response.data;

        if (userData) {
          const { accessToken, refreshToken, nickName } = userData;
          setUserData({ nickName, accessToken });
        }

        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.KAKAO_LOGIN] });
      } else {
        console.error("Login response is null");
      }
    },
  });
};
