import axios from "axios";

export const getData = async (token: string) => {
  try {
    const res = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.data;
  } catch (error) {
    console.log(error);
  }
};
