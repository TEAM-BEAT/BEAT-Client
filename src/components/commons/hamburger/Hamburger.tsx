import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Hamburger.styled";

import { useAtom, useAtomValue } from "jotai";

import { useHamburger, useLogin, useModal } from "@hooks";
import { hamburgerAtom, navigateAtom } from "@stores";
import { requestKakaoLogin } from "@utils/kakaoLogin";
import { usePostLogout } from "@apis/kakaoLogin/queries";

const Hamburger = () => {
  const navigate = useNavigate();
  const { openConfirm, closeConfirm, openAlert } = useModal();

  const { isOpen } = useAtomValue(hamburgerAtom);
  const [, setNavigateUrl] = useAtom(navigateAtom);

  const { isLogin, nickname } = useLogin();
  const { mutateAsync, isPending } = usePostLogout();

  const { closeHamburger } = useHamburger();
  const outside = useRef<HTMLDivElement>(null);

  const handlerOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    closeHamburger();

    e.stopPropagation();
  };

  // 좌우 너비 계산
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

  // 높이 계산
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
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

  const postLogout = async () => {
    if (isPending) {
      return;
    }

    await mutateAsync();
  };

  const handleLogoutBtn = () => {
    openConfirm({
      title: "로그아웃 하시겠습니까?",
      okText: "네",
      okCallback: () => {
        handleLogout().then(() => {
          closeConfirm();
        });
      },
      noText: "아니요",
      noCallback: () => closeConfirm(),
    });
  };

  const handleLogout = async () => {
    try {
      await postLogout();

      localStorage.removeItem("user");
      location.reload();
    } catch (error) {
      openAlert({
        title: "로그아웃에 실패하였습니다. \n다시 시도해 주세요.",
      });
    }
  };

  return (
    <>
      <S.Overlay $isOpen={isOpen} onClick={handlerOutside}>
        <S.HamburgerWrapper
          $isOpen={isOpen}
          ref={outside}
          onClick={(e) => e.stopPropagation()}
          width={width}
          height={height}
        >
          <S.CloseBtn onClick={closeHamburger}>
            <S.CloseIcon />
          </S.CloseBtn>
          {isLogin ? (
            <>
              <S.ProfileContainer>
                <S.ProfileIcon />
                <S.UserName>{nickname}</S.UserName>
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
                <S.LogoutBtn
                  onClick={() => {
                    handleLogoutBtn();
                  }}
                >
                  로그아웃
                </S.LogoutBtn>
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
