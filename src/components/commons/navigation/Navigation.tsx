import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import * as S from "./Navigation.styled";

const Navigation = () => {
  const { header } = useHeader();
  const { headerStyle, title, subText, leftOnClick, rightOnClick } = header;

  if (headerStyle === NAVIGATION_STATE.ICON_TITLE) {
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton onClick={leftOnClick} />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <S.RightDiv />
      </S.NavigationWrapper>
    );
  }

  if (headerStyle === NAVIGATION_STATE.TITLE_ICON) {
    return (
      <S.NavigationWrapper>
        <S.FragmentDiv />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <S.NavigationXButton onClick={rightOnClick} />
      </S.NavigationWrapper>
    );
  }

  if (headerStyle === NAVIGATION_STATE.ICON_TITLE_ICON) {
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton onClick={leftOnClick} />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <S.NavigationXButton onClick={rightOnClick} />
      </S.NavigationWrapper>
    );
  }

  if (headerStyle === NAVIGATION_STATE.ICON_TITLE_SUB_TEXT) {
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton onClick={leftOnClick} />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <S.SubTextButton onClick={rightOnClick}>{subText}</S.SubTextButton>
      </S.NavigationWrapper>
    );
  }

  if (headerStyle === NAVIGATION_STATE.ICON) {
    return (
      <S.NavigationWrapper>
        <S.FragmentDiv />
        <S.NavigationXButton onClick={rightOnClick} />
      </S.NavigationWrapper>
    );
  }

  if (headerStyle === NAVIGATION_STATE.LOGO_HAMBURGAR) {
    return (
      <S.NavigationWrapper>
        <S.Logo onClick={leftOnClick} />
        <S.HamburgarButton onClick={rightOnClick} />
      </S.NavigationWrapper>
    );
  }

  if (headerStyle === NAVIGATION_STATE.ICON_ICON) {
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton onClick={leftOnClick} />
        <S.NavigationXButton onClick={rightOnClick} />
      </S.NavigationWrapper>
    );
  }

  if (!headerStyle) {
    return null;
  }

  return <></>;
};

export default Navigation;
