import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./Navigation.styled";

const Navigation = () => {
  const { pathname } = useLocation();

  const [title, setTitle] = useState("");
  const [subText, setSubText] = useState("");
  // TODO: 전역상태로 관리 ?
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    switch (pathname) {
      case "/testpage":
        setTitle("테스트 페이지");
        break;
      case "/register":
        setTitle("공연 등록하기");
        break;
      case "/lookup/*":
        if (isLoggedIn) {
          setTitle("예매 조회하기");
        } else {
          setTitle("비회원 예매 조회하기");
        }
        break;
      default:
        setTitle("내가 예매한 공연");
    }
  }, [pathname]);

  // return (
  //   <S.NavigationWrapper>
  //     <S.Logo />
  //     <S.HamburgarButton />

  //     <S.NavigationLeftButton />
  //     <S.NavigationTitle>{title}</S.NavigationTitle>
  //     <S.NavigationRightButton />
  //   </S.NavigationWrapper>
  // );

  if (pathname === "/") {
    return (
      <S.NavigationWrapper>
        <S.Logo />
        <S.HamburgarButton />
      </S.NavigationWrapper>
    );
  }

  if (pathname === "/testpage") {
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <div></div>
      </S.NavigationWrapper>
    );
  }

  if (pathname === "/register") {
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <div></div>
      </S.NavigationWrapper>
    );
  }

  // if (pathname === "/lookup") {
  //   return (
  //     <S.NavigationWrapper>
  //       <S.NavigationLeftButton />
  //       <S.NavigationTitle>{title}</S.NavigationTitle>
  //       <S.NavigationRightButton />
  //     </S.NavigationWrapper>
  //   );
  // }

  // subText?
  if (pathname.startsWith("/lookup")) {
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <S.SubTextButton>{subText}</S.SubTextButton>
      </S.NavigationWrapper>
    );
  }

  return (
    <S.NavigationWrapper>
      <S.NavigationLeftButton />
      <S.NavigationTitle>{title}</S.NavigationTitle>
      <S.NavigationRightButton />
    </S.NavigationWrapper>
  );
};

export default Navigation;
