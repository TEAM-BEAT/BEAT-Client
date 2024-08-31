import * as S from "./Intro.styled";
import IntroImg from "../../../src/assets/images/intro.png";
import { Button } from "@components/commons";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/main");
  };

  return (
    <>
      <S.StyledIntroImg src={IntroImg} />

      <S.FooterContainer>
        <Button onClick={handleClick}>BEAT 바로가기</Button>
      </S.FooterContainer>
    </>
  );
};

export default Intro;
