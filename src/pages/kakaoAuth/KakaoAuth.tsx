import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePostKakaoLogin } from "@apis/domains/users/queries";
import { navigateAtom } from "@stores/navigate";
import { useAtom } from "jotai";

const KakaoAuth = () => {
  const navigate = useNavigate();
  const [navigateUrl] = useAtom(navigateAtom);

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
          const userData = await mutateAsync(code);

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

export default KakaoAuth;
