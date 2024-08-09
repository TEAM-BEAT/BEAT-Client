import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./NotFound.styled";

const NotFound = () => {
  const navgigate = useNavigate();
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON,
      rightOnClick: () => {
        navgigate("/main");
      },
    });
  }, []);

  return (
    <S.Container>
      <S.NotFoundImage />
      <S.HeadingText>요청하신 페이지를 찾을 수 없어요.</S.HeadingText>
      <S.SubText>너 때문에 비트가 다 깨져버렸으니 책임져.!</S.SubText>
    </S.Container>
  );
};

export default NotFound;
