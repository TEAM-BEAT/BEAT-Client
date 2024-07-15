import ActionBottomSheet from "@components/commons/bottomSheet/actionsBottomSheet/ActionBottomSheet";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import Button from "@components/commons/button/Button";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import { requestKakaoLogin } from "@utils/kakaoLogin";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Content from "./components/content/Content";
import ShowInfo from "./components/showInfo/ShowInfo";
import { SHOW_DETAIL_INFO, SHOW_TYPE_KEY } from "./constants";
import * as S from "./Gig.styled";

const Gig = () => {
  const navigate = useNavigate();
  const { setHeader } = useHeader();
  const isLoggedIn = false;

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE_SUB_TEXT,
      title: detail.performanceTitle,
      leftOnClick: () => {
        navigate("/main");
      },
    });
  }, []);

  // TODO: performanceId로 상세 정보 조회(GET)
  const { performanceId } = useParams<{ performanceId: string }>();
  const [detail, setDetail] = useState(SHOW_DETAIL_INFO);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleBookClick = () => {
    /* TODO: 토큰 여부에 따라서 리다이렉트 */

    if (isLoggedIn) {
      navigate(`/book/${performanceId}`);
      return;
    }

    setIsSheetOpen(true);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };
  return (
    <S.ContentWrapper>
      <ShowInfo
        posterImage={detail.posterImage}
        genre={detail.genre as SHOW_TYPE_KEY}
        title={detail.performanceTitle}
        price={detail.ticketPrice}
        venue={detail.performanceVenue}
        period={detail.performancePeriod}
        runningTime={detail.runningTime}
        scheduleList={detail.scheduleList}
      />
      <Content
        description={detail.performanceDescription}
        attentionNote={detail.performanceAttentionNote}
        contact={detail.performanceContact}
        teamName={detail.performanceTeamName}
        castList={detail.castList}
        staffList={detail.staffList}
      />
      <S.FooterContainer>
        <Button onClick={handleBookClick}>예매하기</Button>
      </S.FooterContainer>

      <ActionBottomSheet
        isOpen={isSheetOpen}
        onClickOutside={handleSheetClose}
        title="로그인 후 예매하시겠어요?"
        alignItems="center"
        padding="2rem 2rem 2.4rem 2rem"
      >
        <OuterLayout margin="1.6rem 0 0 0">
          <S.ButtonWrapper>
            <Button
              variant="primary"
              size="xlarge"
              style={{ backgroundColor: "#FEE500", color: "#0F0F0F" }}
              onClick={requestKakaoLogin}
            >
              카카오 로그인
            </Button>
            <Button variant="gray" size="xlarge" onClick={() => navigate(`/book/${performanceId}`)}>
              비회원 예매
            </Button>
          </S.ButtonWrapper>
        </OuterLayout>
      </ActionBottomSheet>
    </S.ContentWrapper>
  );
};

export default Gig;
