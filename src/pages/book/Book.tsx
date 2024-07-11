import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import ViewBottomSheet from "@components/commons/bottomSheet/viewBottomSheet/ViewBottomSheet";
import Button from "@components/commons/button/Button";
import Context from "@components/commons/contextBox/Context";
import React, { useEffect, useState } from "react";
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
  const [selectedValue, setSelectedValue] = useState<number>();
  const [round, setRound] = useState(1);
  const [bookerInfo, setBookerInfo] = useState({
    name: "",
    phoneNumber: "",
  });
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(false);

  const handleRadioChange = (value: number) => {
    setSelectedValue(value);
  };

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

  const onClickTermCheck = () => {
    setIsTermChecked((prev) => !prev);
  };

  const handleSheetOpen = () => {
    setIsOpen(true);
  };

  const handleSheetClose = () => {
    setIsOpen(false);
  };

  const handleClickBook = () => {
    // TODO: 티켓 매수 요청 GET API 후, true 인 상태일 때 바텀 시트 열기

    handleSheetOpen();
  };

  const handleClickBookRequst = () => {
    // TODO: 티켓 매수 요청 get 요청 후, true 인 상태일 때 바텀 시트 열기
    const formData = { selectedValue, round, bookerInfo, isTermChecked };
    console.log(formData);

    // TODO: 예매하기 post 요청

    // TODO: 완료 페이지로 navigate
  };

  useEffect(() => {
    if (selectedValue && bookerInfo.name && bookerInfo.phoneNumber && isTermChecked) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [selectedValue, bookerInfo, isTermChecked]);

  return (
    <ContentWrapper>
      <Info
        genre={detail.genre}
        title={detail.performanceTitle}
        teamName={detail.performanceTeamName}
        venue={detail.performanceVenue}
        period={detail.performancePeriod}
      />
      <Divider />

      <Select
        selectedValue={selectedValue as number}
        handleRadioChange={handleRadioChange}
        scheduleList={detail.scheduleList}
      />
      <Count
        round={round}
        onMinusClick={onMinusClick}
        onPlusClick={onPlusClick}
        ticketPrice={detail.ticketPrice}
        availableTicketCount={
          selectedValue ? detail.scheduleList[selectedValue - 1].availableTicketCount : undefined
        }
      />

      <BookerInfo bookerInfo={bookerInfo} onChangeBookerInfo={onChangeBookerInfo} />
      <TermCheck isTermChecked={isTermChecked} onClickTermCheck={onClickTermCheck} />
      <FooterContainer>
        <Button disabled={!activeButton} onClick={handleClickBook}>
          예매하기
        </Button>
      </FooterContainer>

      <ViewBottomSheet
        isOpen={isOpen}
        onClickOutside={handleSheetClose}
        title="예매하신 내역이 맞나요?"
        boxTitle={detail.performanceTitle}
        boxTitleColor="pink_200"
      >
        <Context
          isDate={true}
          subTitle="날짜"
          date={detail.scheduleList[(selectedValue ?? 1) - 1].performanceDate
            .slice(0, 10)
            .toString()}
          time={detail.scheduleList[(selectedValue ?? 1) - 1].performanceDate
            .slice(11, 16)
            .toString()}
        />
        <Context subTitle="가격" text={`${(detail.ticketPrice * round).toLocaleString()}원`} />
        <Context subTitle="예매자" text={bookerInfo.name} />
        <OuterLayout gap="1.1rem" margin="2.4rem 0 0 0">
          <Button variant="gray" size="medium" onClick={handleSheetClose}>
            다시 할게요
          </Button>
          <Button variant="primary" size="medium" onClick={handleClickBookRequst}>
            예매할게요
          </Button>
        </OuterLayout>
      </ViewBottomSheet>
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

const Divider = styled.div`
  width: 375px;
  height: 8px;
  margin-top: 1.6rem;

  background: ${({ theme }) => theme.colors.gray_800};
  opacity: 0.6;
  border: 1px s;
`;

const FooterContainer = styled.div`
  position: sticky;
  bottom: 0;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;
