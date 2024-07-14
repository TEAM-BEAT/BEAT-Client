import * as S from "./Performance.Cardstyled";

const PerformnaceCard = ({ ...item }) => {
  return (
    <S.PerformanceCardWrapper key={item.performanceId}>
      <S.PerformanceImg />
      {item.dueDate <= 5 ? (
        <>
          <S.SubtractBox></S.SubtractBox>
          <S.DueDate>D-{item.dueDate}</S.DueDate>
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
