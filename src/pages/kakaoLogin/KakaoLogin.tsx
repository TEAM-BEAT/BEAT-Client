import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { navigateAtom } from "@stores/navigate";
import { useAtom } from "jotai";
import { usePostKakaoLogin } from "@apis/domains/users/queries";
import { userAtom } from "@stores/user";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const [navigateUrl] = useAtom(navigateAtom);
  const [, setUserData] = useAtom(userAtom);

  const [readyLogin, setReadyLogin] = useState(false);

  const { mutateAsync } = usePostKakaoLogin();

  // 로그인 완료되면 상태 확인
  useEffect(() => {
    if (readyLogin) {
      navigate(navigateUrl);
    }
  }, [readyLogin]);

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        try {
          console.log(code);

          const userData = await mutateAsync(code);
          const accessToken = userData?.accessToken;
          const nickName = userData?.nickname;

          if (accessToken && nickName) {
            setUserData({ nickName, accessToken });
          }

          setReadyLogin(true);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [code, navigate]);

  return <div></div>;
};

export default KakaoLogin;
