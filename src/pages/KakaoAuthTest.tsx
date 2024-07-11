import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoAuthTest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 현재는 카카오 로그인 페이지로 이동 -> 실제로는 메인 혹은 로그인 시 이동하는 페이지로 이동
    navigate("/kakao-login", { state: code });
  }, []);

  const code = new URL(window.location.href).searchParams.get("code");

  return <div>로그인 과정 페이지~ </div>;
};

export default KakaoAuthTest;
