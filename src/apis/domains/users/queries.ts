import { QueryClient, useMutation } from "@tanstack/react-query";
import { postKakaoLogin } from "./api";
import { useAtom } from "jotai";
import { userAtom } from "@stores/user";
import { components } from "@typings/api/schema";

const QUERY_KEY = {
  KAKAO_LOGIN: "kakaoLogin",
};

type LoginSuccessResponse = components["schemas"]["LoginSuccessResponse"];

export const usePostKakaoLogin = () => {
  const [, setUserData] = useAtom(userAtom);
  const queryClient = new QueryClient();

  return useMutation<LoginSuccessResponse | null, unknown, string>({
    mutationFn: (authCode: string) => postKakaoLogin(authCode),
    onSuccess: (response) => {
      if (response) {
        console.log("login success", response);

        const userData = response;

        if (userData) {
          const { accessToken, nickname } = userData;

          if (accessToken && nickname) {
            setUserData({ nickname, accessToken });
          } else {
            console.error("accessToken or nickname is undefined");
          }
        }

        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.KAKAO_LOGIN] });
      } else {
        console.error("Login response is null");
      }
    },
  });
};
