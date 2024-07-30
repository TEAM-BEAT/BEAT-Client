import { userAtom } from "@stores";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const useLogin = () => {
  const [userData, setUserData] = useAtom(userAtom);
  const [isLogin, setIsLogin] = useState(false);
  const { nickname, accessToken } = userData;

  const checkLogin = () => {
    if (nickname && accessToken) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsLogin(checkLogin());
  }, [userData]);

  return { isLogin, nickname };
};

export default useLogin;
