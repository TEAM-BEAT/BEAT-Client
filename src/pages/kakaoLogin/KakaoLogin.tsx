import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from "@apis/kakoLogin/postKakaoToken";
import { getData } from "@apis/kakoLogin/getKakaoData";

const KakaoLogin = () => {
  const navigate = useNavigate();
  //   const [userData, setUserData] = useState(null);

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        // 전에 있던 페이지에 따라 어떤 페이지로 이동할 건지 분기처리 필요
        // 분기 처리 안 되면 이전 페이지로 이동
        navigate("/kakao-login");

        try {
          const token = await getToken(code);
          const userData = await getData(token);

          // 이 부분 이메일 + 닉네임 + 인가코드까지 서버에 POST
          console.log(userData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [code, navigate]);

  return <div>로그인 과정 페이지~ </div>;
};

export default KakaoLogin;
