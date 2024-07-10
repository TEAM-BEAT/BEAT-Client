import { useState } from "react";
import styled from "styled-components";
import Count from "./components/count/Count";
import Info from "./components/info/Info";
import Select from "./components/select/Select";
import { BOOK_DETAIL_INFO } from "./constants/dummy";

const Book = () => {
  const [detail, setDetail] = useState(BOOK_DETAIL_INFO);

  const [round, setRound] = useState(1);

  const onMinusClick = () => {
    setRound((prev) => prev - 1);
  };

  const onPlusClick = () => {
    setRound((prev) => prev + 1);
  };

  return (
    <ContentWrapper>
      <Info
        genre={detail.genre}
        title={detail.performanceTitle}
        teamName={detail.performanceTeamName}
        venue={detail.performanceVenue}
        period={detail.performancePeriod}
      />
      <Select />
      <Count
        round={round}
        onMinusClick={onMinusClick}
        onPlusClick={onPlusClick}
        ticketPrice={detail.ticketPrice}
      />
      <div>예매자 정보</div>
    </ContentWrapper>
  );
};

export default Book;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2.4rem;
`;
