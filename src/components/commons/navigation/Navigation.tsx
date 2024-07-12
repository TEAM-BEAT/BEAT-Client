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

<<<<<<< HEAD
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
=======
  if (headerStyle === NAVIGATION_STATE.ICON_TITLE) {
>>>>>>> develop
    return (
      <S.NavigationWrapper>
        <S.NavigationLeftButton onClick={leftOnClick} />
        <S.NavigationTitle>{title}</S.NavigationTitle>
        <S.FragmentDiv />
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
