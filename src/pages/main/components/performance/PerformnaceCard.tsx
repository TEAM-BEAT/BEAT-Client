import * as S from "./Performance.Cardstyled";

import Labal from "@components/commons/label/Labal";

const PerformnaceCard = ({ ...item }) => {
  return (
    <S.PerformanceCardWrapper key={item.performanceId}>
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
