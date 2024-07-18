import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import * as S from "./Navigation.styled";

const Navigation = () => {
  const { header } = useHeader();
  const { headerStyle, title, subText, leftOnClick, rightOnClick } = header;

  //함수 연결은 거의 필수이므로, 경고 콘솔 띄워 디버깅 용이하도록 구성.
  if (!leftOnClick) {
    //만약 왼쪽 함수를 부여하지 않았다면
    console.log("warn: 왼쪽 버튼 미연결");
  }
  if (!rightOnClick) {
    //만약 오른쪽 함수를 부여하지 않았다면
    console.log("warn: 오른쪽 버튼 미연결");
  }

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
