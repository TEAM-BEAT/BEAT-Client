import * as S from "./Performance.Cardstyled";
import { useNavigate } from "react-router-dom";

import Labal from "@components/commons/label/Labal";

const PerformnaceCard = ({ ...item }) => {
  const navigate = useNavigate();

  return (
    <S.PerformanceCardWrapper
      key={item.performanceId}
      onClick={() => {
        // id값 줘서 클릭하면 해당 공연으로 넘어갈 수 있도록
        navigate(`/gig/${1}`);
      }}
    >
      <S.PerformanceImg src={item.posterImage} />
      {item.dueDate <= 5 ? (
        <>
          <Labal type="count">D-{item.dueDate}</Labal>
        </>
      ) : null}
      <S.PerformanceTitleWrapper>
        <S.PerformanceTitle>{item.performanceTitle}</S.PerformanceTitle>
        <S.PerformancePeriod>{item.performancePeriod}</S.PerformancePeriod>
        <S.PerformancePrice>{item.ticketPrice.toLocaleString("en-US")}원</S.PerformancePrice>
      </S.PerformanceTitleWrapper>
    </S.PerformanceCardWrapper>
  );
};

export default PerformnaceCard;
