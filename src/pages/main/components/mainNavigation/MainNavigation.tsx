import { useNavigate } from "react-router-dom";
import * as S from "./MainNavigation.styled";

import useHamburger from "@hooks/useHamburger";
import Hamburger from "../../../../components/commons/hamburger/Hamburger";

const MainNavigation = () => {
  const navigate = useNavigate();
  const { openHamburger } = useHamburger();

  const toggleSide = () => {
    openHamburger();
  };
  return (
    <S.MainNavigationWrapper>
      <S.LogoBtn
        onClick={() => {
          navigate("/main");
        }}
      >
        <S.LogoIcon />
      </S.LogoBtn>
      <S.HamburgarBtn onClick={toggleSide}>
        <S.HamburgarIcon />
      </S.HamburgarBtn>
      <Hamburger />
    </S.MainNavigationWrapper>
  );
};

export default MainNavigation;
