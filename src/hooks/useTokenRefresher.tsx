import { instance } from "@apis/index";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useModal from "./useModal";

export default function TokenRefresher() {
  const location = useLocation();
  const navigate = useNavigate();
  const { openAlert } = useModal();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      if (!JSON.parse(userString)?.role) {
        // 기존에 존재하던 유저 role 유무로 임시로 토큰 제거 후 리로드
        localStorage.clear();
        openAlert({
          title: "다시 로그인 해주세요.",
          okCallback: () => {
            localStorage.clear();
            if (location.pathname === "/main") {
              window.location.reload();
            } else {
              navigate("/main");
            }
          },
        });

        return;
      }
    }

    const interceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalConfig = error.config;
        const status = error?.response?.status;

        if (status === 401 && userString) {
          try {
            const response: AxiosResponse<{ data: { accessToken: string } }> = await axios.get(
              `${import.meta.env.VITE_API_BASE_URL}/users/refresh-token`,
              {
                withCredentials: true,
              }
            );

            const newAccessToken = response.data?.data?.accessToken;

            const user = JSON.parse(userString);
            user.accessToken = newAccessToken;
            if (newAccessToken) {
              localStorage.setItem("user", JSON.stringify(user));
              originalConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return instance(originalConfig);
            }
            throw new Error("Failed to refresh access token");
          } catch (refreshError) {
            if (refreshError.response?.status === 401) {
              openAlert({
                title: "장시간 미활동으로 인해 \n자동으로 로그아웃 되었습니다.",
                okCallback: () => {
                  localStorage.clear();
                  if (location.pathname === "/main") {
                    window.location.reload();
                  } else {
                    navigate("/main");
                  }
                },
              });
            }
          }
        } else if (status === 500) {
          openAlert({
            title: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.response.eject(interceptor);
    };
  }, []);

  return <></>;
}
