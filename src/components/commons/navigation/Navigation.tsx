import { NAVIGATION_STATE, NavigationState } from "@constants/navigationState";
import useModal from "@hooks/useModal";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./Navigation.styled";

const Navigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openConfirm } = useModal();

  const [headerPosition, setHeaderPosition] = useState<NavigationState>();
  const [title, setTitle] = useState("");
  const [subText, setSubText] = useState("");
  // TODO: 전역상태로 관리?
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onClickLogo = () => {
    // TODO: 화면 맨 위로 스크롤? 어떤 액션할 지
    navigate("/");
  };

  const onClickMenuBar = () => {
    // TODO: 메뉴 연결
    console.log("clicked menubar");
  };

  const onClickBack = () => {
    openConfirm({
      title: "정말 나가시겠습니까?",
      subTitle: "지금 나가실 경우 작성하신 내용이 저장되지 않습니다.",
      okText: "작성할게요",
      okCallback: () => {
        // TODO: 액션 추가
        console.log("ok click");
      },
      noText: "나갈게요",
      noCallback: () => {
        // TODO: 액션 추가
        console.log("no click");
      },
    });
  };

  const onClickTest = () => {
    console.log("test Click");
  };

  useEffect(() => {
    switch (pathname) {
      case "/testpage":
        setHeaderPosition(NAVIGATION_STATE.ICON_TITLE_ICON);
        setTitle("테스트 페이지");
        setSubText("삭제");
        break;
      case "/":
        setHeaderPosition(NAVIGATION_STATE.LOGO_HAMBURGAR);
        break;
      case "/register":
        // TODO: 상세정보, 미리보기, 완료 따라 position, title 다르게
        setHeaderPosition(NAVIGATION_STATE.ICON_TITLE);
        break;
      case "/book":
        // TODO: 상세, 예매하기, 완료 따라 position, title 다르게
        setHeaderPosition(NAVIGATION_STATE.ICON_TITLE);
        break;
      case "/lookup":
        // TODO: 회원, 비회원 로그인 여부에 따라 title 다르게
        setHeaderPosition(NAVIGATION_STATE.ICON_TITLE);
        break;
      case "/manage":
        // TODO: 공연목록, 수정, 삭제 따라 position, title, subTitle 다르게
        setHeaderPosition(NAVIGATION_STATE.ICON_TITLE);
        break;
      case "/ticketholderlist":
        setHeaderPosition(NAVIGATION_STATE.ICON_TITLE_SUB_TEXT);
        setTitle("내가 등록한 공연");
        setSubText("삭제");
        break;
      case "/myregisteredshow":
        setHeaderPosition(NAVIGATION_STATE.ICON_TITLE);
        setTitle("내가 등록한 공연");
        break;
      default:
        setTitle("");
    }
  }, [pathname]);

  if (headerPosition === NAVIGATION_STATE.ICON_TITLE) {
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton onClick={onClickBack} />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <S.FragmentDiv />
      </S.NavigationWrapper>
    );
  }

  if (headerPosition === NAVIGATION_STATE.TITLE_ICON) {
    return (
      <S.NavigationWrapper>
        <S.FragmentDiv />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <S.NavigationXButton onClick={onClickTest} />
      </S.NavigationWrapper>
    );
  }

  if (headerPosition === NAVIGATION_STATE.ICON_TITLE_ICON) {
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton onClick={onClickTest} />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <S.NavigationXButton onClick={onClickTest} />
      </S.NavigationWrapper>
    );
  }

  if (headerPosition === NAVIGATION_STATE.ICON_TITLE_SUB_TEXT) {
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton onClick={onClickTest} />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <S.SubTextButton onClick={onClickTest}>{subText}</S.SubTextButton>
      </S.NavigationWrapper>
    );
  }

  if (headerPosition === NAVIGATION_STATE.ICON) {
    return (
      <S.NavigationWrapper>
        <S.FragmentDiv />
        <S.NavigationXButton onClick={onClickTest} />
      </S.NavigationWrapper>
    );
  }

  if (headerPosition === NAVIGATION_STATE.LOGO_HAMBURGAR) {
    return (
      <S.NavigationWrapper>
        <S.Logo onClick={onClickLogo} />
        <S.HamburgarButton onClick={onClickMenuBar} />
      </S.NavigationWrapper>
    );
  }

  if (headerPosition === NAVIGATION_STATE.ICON_ICON) {
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton onClick={onClickTest} />
        <S.NavigationXButton onClick={onClickTest} />
      </S.NavigationWrapper>
    );
  }

  return <></>;
};

export default Navigation;
