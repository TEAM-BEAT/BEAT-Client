import ActionBottomSheet from "@components/commons/bottomSheet/actionsBottomSheet/ActionBottomSheet";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import Button from "@components/commons/button/Button";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Content from "./components/content/Content";
import ShowInfo from "./components/showInfo/ShowInfo";
import { SHOW_DETAIL_INFO } from "./constants";

const Gig = () => {
  const navigate = useNavigate();
  const { setHeader } = useHeader();

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
    setIsSheetOpen(true);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <ContentWrapper>
      <ShowInfo
        posterImage={detail.posterImage}
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
      <FooterContainer>
        {/* TODO: 토큰 여부에 따라서 리다이렉트 */}
        <Button onClick={handleBookClick}>예매하기</Button>
      </FooterContainer>

      <ActionBottomSheet
        isOpen={isSheetOpen}
        onClickOutside={handleSheetClose}
        title="로그인 후 예매하시겠어요?"
        alignItems="center"
        padding="2rem 2rem 2.4rem 2rem"
      >
        <OuterLayout margin="1.6rem 0 0 0">
          <Button variant="primary" size="xlarge">
            확인했어요
          </Button>
          <Button variant="primary" size="xlarge">
            확인했어요
          </Button>
        </OuterLayout>
      </ActionBottomSheet>
    </ContentWrapper>
  );
};

export default Gig;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2.4rem;
`;

const FooterContainer = styled.div`
  position: sticky;
  bottom: 0;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;
