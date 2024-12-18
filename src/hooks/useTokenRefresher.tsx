import { get, instance } from "@apis/index";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "./useModal";

export default function TokenRefresher() {
  const navigate = useNavigate();
  const { openAlert } = useModal();

  const user = localStorage.getItem("user");
  if (user) {
    if (!JSON.parse(user)?.role || !JSON.parse(user)?.refreshToken) {
      // 기존에 존재하던 유저 role, refreshToken 유무로 임시로 토큰 제거 후 리로드
      localStorage.clear();
      openAlert({ title: "다시 로그인 해주세요." });
      window.location.reload();
      return <></>;
    }
  }

  useEffect(() => {
    const interceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalConfig = error.config;
        const status = error?.response?.status;

        if (status === 401 && user) {
          try {
            const refreshToken = JSON.parse(user)?.refreshToken;

            const response: AxiosResponse<{ data: { accessToken: string } }> = await get(
              "/users/refresh-token",
              {
                headers: { Authorization_Refresh: refreshToken },
              }
            );

            const newAccessToken = response.data?.data?.accessToken;

            if (newAccessToken) {
              localStorage.setItem("accessToken", `Bearer ${newAccessToken}`);
              originalConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return instance(originalConfig);
            }
            throw new Error("Failed to refresh access token");
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            localStorage.clear();
            navigate("/main");
            openAlert({ title: "장시간 미활동으로 인해 \n자동으로 로그아웃 되었습니다." });
            window.location.reload();
          }
        } else if (status === 500) {
          openAlert({
            title: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
          });
        }

        console.error("응답 에러:", error);
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.response.eject(interceptor);
    };
  }, []);

  return <></>;
}
