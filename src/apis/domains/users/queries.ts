import { QueryClient, useMutation } from "@tanstack/react-query";
import { postKakaoLogin } from "./api";
import { useAtom } from "jotai";
import { userAtom } from "@stores/user";

const QUERY_KEY = {
  KAKAO_LOGIN: "kakaoLogin",
};

export const usePostKakaoLogin = () => {
  const [, setUserData] = useAtom(userAtom);
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (authCode: string) => postKakaoLogin(authCode),
    onSuccess: (response) => {
      console.log("login success", response);

      const userData = response.data.data;
      // if (resData) {
      //   const { guestNickname, guestId, hostNickname, hostId, token } = resData;

      //   setUser({ ...user, guestNickname, guestId, hostNickname, hostId });

      //   if (token && token.accessToken) {
      //     localStorage.setItem("accessToken", token.accessToken);
      //   }

      if (userData) {
        const { accessToken, refreshToken, nickName } = userData;
        setUserData({ nickName, accessToken });
      }

      //   queryClient.invalidateQueries({ queryKey: [QUERY_KEY.KAKAO_LOGIN] });

      //   // navigate 로직 추가
      // }
    },
  });
};
