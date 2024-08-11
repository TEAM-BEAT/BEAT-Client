import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NotFound.styled";

const NotFound = () => {
  const navigate = useNavigate();
  const { setHeader } = useHeader();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON,
      rightOnClick: () => {
        navigate("/main");
      },
    });

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    // 5초 후에 main 페이지로 이동
    const timer = setTimeout(() => {
      navigate("/main");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <S.Container>
      <S.NotFoundImage />
      <S.HeadingText>요청하신 페이지를 찾을 수 없어요.</S.HeadingText>
      <S.SubText>너 때문에 비트가 다 깨져버렸으니 책임져.!</S.SubText>
      <S.CountdownText>{secondsLeft}초 후에 메인 페이지로 이동합니다.</S.CountdownText>
    </S.Container>
  );
};

export default NotFound;
