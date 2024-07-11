import Button from "@components/commons/button/Button";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookerInfo from "./components/bookerInfo/BookerInfo";
import Count from "./components/count/Count";
import Info from "./components/info/Info";
import Select from "./components/select/Select";
import TermCheck from "./components/termCheck/TermCheck";
import { BOOK_DETAIL_INFO } from "./constants/dummy";

const Book = () => {
  const { performanceId } = useParams<{ performanceId: string }>();
  const [detail, setDetail] = useState(BOOK_DETAIL_INFO);

  const [round, setRound] = useState(1);
  const [bookerInfo, setBookerInfo] = useState({
    name: "",
    phoneNumber: "",
  });

  const onChangeBookerInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBookerInfo((prev) => ({ ...prev, [name]: value }));
  };

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
      <BookerInfo bookerInfo={bookerInfo} onChangeBookerInfo={onChangeBookerInfo} />
      <TermCheck />
      <FooterContainer>
        {/* TODO: 티켓 매수 체크 후 BottomSheet 추가 */}
        <Button onClick={() => console.log("예매하기 클릭")}>예매하기</Button>
      </FooterContainer>
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

const FooterContainer = styled.div`
  position: sticky;
  bottom: 0;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;
