export const requestKakaoLogin = () => {
  const REST_API = import.meta.env.VITE_REST_API;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    const code = new URL(window.location.href).searchParams.get("code");

    window.location.href = kakaoURL;

    return code;
  };

  return handleLogin();
};
