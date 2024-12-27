import { instance } from "@apis/index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "./useModal";

export default function TokenRefresher() {
  const navigate = useNavigate();
  const { openAlert } = useModal();

  useEffect(() => {
    const user = localStorage.getItem("user");

    const getCookie = (name: string): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(";").shift();
      }
    };

    if (user) {
      if (!JSON.parse(user)?.role) {
        // 기존에 존재하던 유저 role 유무로 임시로 토큰 제거 후 리로드
        localStorage.clear();
        openAlert({ title: "다시 로그인 해주세요." });
        window.location.reload();
        return;
      }
    }

    const interceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalConfig = error.config;
        const status = error?.response?.status;

        // if (status === 401 && user) {
        //   try {
        //     const refreshToken = getCookie("refreshToken");

        //     const response: AxiosResponse<{ data: { accessToken: string } }> = await axios.get(
        //       `${import.meta.env.VITE_API_BASE_URL}/users/refresh-token`,
        //       {
        //         headers: {
        //           Authorization_Refresh: `Bearer ${refreshToken}`,
        //         },
        //       }
        //     );

        //     const newAccessToken = response.data?.data?.accessToken;

        //     if (newAccessToken) {
        //       localStorage.setItem("accessToken", `Bearer ${newAccessToken}`);
        //       originalConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
        //       return instance(originalConfig);
        //     }
        //     throw new Error("Failed to refresh access token");
        //   } catch (refreshError) {
        //     if (refreshError.response?.status === 404) {
        //       // 리프레시 토큰도 없다?  다시 로그인
        //       // 그렇지 않으면 요청이 성공하겠찌.. ?
        //     }
        //     console.error("Token refresh failed:", refreshError);
        //     // localStorage.clear();
        //     // navigate("/main");
        //     openAlert({ title: "장시간 미활동으로 인해 \n자동으로 로그아웃 되었습니다." });
        //     // window.location.reload();
        //   }
        // } else if (status === 500) {
        //   openAlert({
        //     title: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        //   });
        // }

        if (status === 401) {
          openAlert({
            title: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
          });
          localStorage.clear();
          navigate("/main");
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
