import * as S from "./MainNavigation.styled";
import { useNavigate } from "react-router-dom";

const MainNavigation = () => {
  const navigate = useNavigate();

  return (
    <S.MainNavigationWrapper>
      <S.LogoBtn
        onClick={() => {
          navigate("/main");
        }}
      >
        <S.LogoIcon />
      </S.LogoBtn>
      <S.HamburgarBtn onClick={() => {}}>
        <S.HamburgarIcon />
      </S.HamburgarBtn>
    </S.MainNavigationWrapper>
  );
};

export default MainNavigation;
