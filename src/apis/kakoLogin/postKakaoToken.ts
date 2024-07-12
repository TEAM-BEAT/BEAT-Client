import axios from "axios";

export const getToken = async (code: string) => {
  const grant_type = "authorization_code";
  const REST_API = import.meta.env.VITE_REST_API;
  const REDIRECT_URI = "http://localhost:5173/auth";
  const AUTHORIZE_CODE = code;

  try {
    const res = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${REST_API}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    const token = res.data.access_token;

    return token;
  } catch (error) {
    console.log(error);
  }
};
