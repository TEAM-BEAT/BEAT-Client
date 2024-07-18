export const requestKakaoLogin = () => {
  const REST_API = import.meta.env.VITE_REST_API;
  // const REDIRECT_URI = "http://localhost:5173/auth";
  // const REDIRECT_URI = "https://www.beatlive.kr/auth";
  const REDIRECT_URI = "http://localhost:5173/auth";

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    const code = new URL(window.location.href).searchParams.get("code");

    window.location.href = kakaoURL;

    return code;
  };

  return handleLogin();
};
