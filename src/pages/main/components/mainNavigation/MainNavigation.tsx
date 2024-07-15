import * as S from "./MainNavigation.styled";
import { useNavigate } from "react-router-dom";

import Hamburger from "../../../../components/commons/hamburger/Hamburger";
import useHamburger from "@hooks/useHamburger";

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
