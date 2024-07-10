import { useState } from "react";
import styled from "styled-components";
import Info from "./components/info/Info";
import { BOOK_DETAIL_INFO } from "./constants/dummy";

const Book = () => {
  const [detail, setDetail] = useState(BOOK_DETAIL_INFO);

  return (
    <ContentWrapper>
      <Info
        genre={detail.genre}
        title={detail.performanceTitle}
        teamName={detail.performanceTeamName}
        venue={detail.performanceVenue}
        period={detail.performancePeriod}
      />
    </ContentWrapper>
  );
};

export default Book;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
