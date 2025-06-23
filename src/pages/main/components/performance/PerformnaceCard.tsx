import { useNavigate } from "react-router-dom";
import * as S from "./PerformanceCard.styled";

import Label from "@components/commons/label/Label";

import { Tracking } from "@components/commons/track/Tracking";

const PerformnaceCard = ({ ...item }) => {
  const navigate = useNavigate();

  return (
    <Tracking event="CLICKED_SECTION_GIG" properties={{ gig_id: item.performanceId }}>
      <S.PerformanceCardWrapper
        key={item.performanceId}
        onClick={() => {
          navigate(`/gig/${item.performanceId}`);
        }}
      >
        <S.PerformanceImg src={item.posterImage} />

        <Label dueDate={item.dueDate} />
        <S.PerformanceTitleWrapper>
          <S.PerformanceTitle>{item.performanceTitle}</S.PerformanceTitle>
          <S.PerformancePeriod>{item.performancePeriod}</S.PerformancePeriod>
          <S.PerformancePrice>{item.ticketPrice.toLocaleString("en-US")}원</S.PerformancePrice>
        </S.PerformanceTitleWrapper>
      </S.PerformanceCardWrapper>
    </Tracking>
  );
};

export default PerformnaceCard;
