import useHamburger from "@hooks/useHamburger";
import { hamburgerAtom } from "@stores/hamburger";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Hamburger.styled";

import { useAtom, useAtomValue } from "jotai";

import { navigateAtom } from "@stores/navigate";
import { requestKakaoLogin } from "@utils/kakaoLogin";

const Hamburger = () => {
  const navigate = useNavigate();

  const { isOpen } = useAtomValue(hamburgerAtom);
  const [, setNavigateUrl] = useAtom(navigateAtom);

  const [isLogin, setIsLogin] = useState(true);

  const { closeHamburger } = useHamburger();
  const outside = useRef<HTMLDivElement>(null);

  const handlerOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    closeHamburger();

    e.stopPropagation();
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleKakaoLogin = (url: string) => {
    setNavigateUrl(url);
    requestKakaoLogin();
    closeHamburger();
  };

  return (
    <>
      <S.Overlay $isOpen={isOpen} onClick={handlerOutside}>
        <S.HamburgerWrapper
          $isOpen={isOpen}
          ref={outside}
          onClick={(e) => e.stopPropagation()}
          width={width}
        >
          <S.CloseBtn onClick={closeHamburger}>
            <S.CloseIcon />
          </S.CloseBtn>
          {isLogin ? (
            <>
              <S.ProfileContainer>
                <S.ProfileIcon />
                {/* 이 부분 API 연결하면 사용자 이름으로 변경 */}
                <S.UserName>프로필 이름</S.UserName>
              </S.ProfileContainer>
              <S.NavigateBtnWrapper>
                <S.NavigateBtn
                  onClick={() => {
                    navigate("/gig-manage");
                    closeHamburger();
                  }}
                >
                  <S.NavigateBtnText>내가 등록한 공연</S.NavigateBtnText>
                  <S.ArrowRightIcon />
                </S.NavigateBtn>
                <S.NavigateBtn
                  onClick={() => {
                    navigate("/lookup");
                    closeHamburger();
                  }}
                >
                  <S.NavigateBtnText>내가 예매한 공연</S.NavigateBtnText>
                  <S.ArrowRightIcon />
                </S.NavigateBtn>
              </S.NavigateBtnWrapper>
            </>
          ) : (
            <>
              <S.ProfileContainer>
                <S.ProfileIcon />
                <S.LoginBtn onClick={() => handleKakaoLogin("/main")}>로그인 하기</S.LoginBtn>
              </S.ProfileContainer>
              <S.NavigateBtn
                onClick={() => {
                  navigate("/nonmb-lookup");
                  closeHamburger();
                }}
              >
                <S.NavigateBtnText>비회원 예매 조회</S.NavigateBtnText>
                <S.ArrowRightIcon />
              </S.NavigateBtn>
            </>
          )}
        </S.HamburgerWrapper>
      </S.Overlay>
    </>
  );
};

export default Hamburger;
