import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useHamburger from "@hooks/useHamburger";
import { hamburgerAtom } from "@stores/hamburger";
import { useAtom, useAtomValue } from "jotai";
import * as S from "./Hamburger.styled";
import { requestKakaoLogin } from "@utils/kakaoLogin";
import { navigateAtom } from "@stores/navigate";

const Hamburger = () => {
  const navigate = useNavigate();

  const { isOpen } = useAtomValue(hamburgerAtom);
  const [, setNavigateUrl] = useAtom(navigateAtom);

  const [isLogin, setIsLogin] = useState(false);

  const { closeHamburger } = useHamburger();
  const outside = useRef<HTMLDivElement>(null);

  const handlerOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    closeHamburger();
    e.stopPropagation();
  };

  const handleKakaoLogin = (url: string) => {
    setNavigateUrl(url);
    requestKakaoLogin();
  };

  return (
    <>
      {isOpen && <S.Overlay onClick={handlerOutside} />}
      <S.HamburgerWrapper
        ref={outside}
        className={isOpen ? "open" : ""}
        onClick={(e) => e.preventDefault()}
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
                  navigate("/gig-register");
                }}
              >
                <S.NavigateBtnText>내가 등록한 공연</S.NavigateBtnText>
                <S.ArrowRightIcon />
              </S.NavigateBtn>
              <S.NavigateBtn
                onClick={() => {
                  navigate("/lookup");
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
              }}
            >
              <S.NavigateBtnText>비회원 예매 조회</S.NavigateBtnText>
              <S.ArrowRightIcon />
            </S.NavigateBtn>
          </>
        )}
      </S.HamburgerWrapper>
    </>
  );
};

export default Hamburger;
