import Button from "@components/commons/button/Button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Content from "./components/content/Content";
import ShowInfo from "./components/showInfo/ShowInfo";
import { SHOW_DETAIL_INFO } from "./constants";

const Gig = () => {
  const navigate = useNavigate();
  // TODO: performanceId로 상세 정보 조회(GET)
  const { performanceId } = useParams<{ performanceId: string }>();
  const [detail, setDetail] = useState(SHOW_DETAIL_INFO);

  return (
    <div>
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
        <Button onClick={() => navigate("/book/1")}>예매하기</Button>
      </FooterContainer>
    </div>
  );
};

export default Gig;

const FooterContainer = styled.div`
  position: sticky;
  bottom: 0;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;
