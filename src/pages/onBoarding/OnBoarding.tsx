import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const OnBoarding = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/main");
  }, []);

  return null;
};
