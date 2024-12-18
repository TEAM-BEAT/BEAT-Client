import { userAtom } from "@stores";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { components } from "@typings/api/schema";
import { useAtom } from "jotai";
import { postKakaoLogin } from "./api";

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
        const userData = response;

        console.log(response);

        if (userData) {
          const { accessToken, nickname, refreshToken, role } = userData;

          if (accessToken && nickname) {
            setUserData({ nickname, accessToken, refreshToken, role });
          } else {
            console.error("accessToken or nickname is undefined");
          }
        }

        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.KAKAO_LOGIN] });
        queryClient.refetchQueries({ queryKey: [QUERY_KEY.KAKAO_LOGIN] });
      } else {
        console.error("Login response is null");
      }
    },
  });
};
