import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import ViewBottomSheet from "@components/commons/bottomSheet/viewBottomSheet/ViewBottomSheet";
import Button from "@components/commons/button/Button";
import Context from "@components/commons/contextBox/Context";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import * as S from "./Book.styled";
import BookerInfo from "./components/bookerInfo/BookerInfo";
import Count from "./components/count/Count";
import EasyPassEntry from "./components/easyPassEntry/EasyPassEntry";
import Info from "./components/info/Info";
import Select from "./components/select/Select";
import TermCheck from "./components/termCheck/TermCheck";
import { BOOK_DETAIL_INFO } from "./constants/dummy";
import { FormData } from "./typings/formData";

const Book = () => {
  const navigate = useNavigate();
  const { performanceId } = useParams<{ performanceId: string }>();

  // TODO: 회원/비회원 여부
  const { setHeader } = useHeader();
  const isNonMember = true;

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE_SUB_TEXT,
      title: "예매하기",
      leftOnClick: () => {
        navigate(`/gig/${performanceId}`);
      },
    });
  }, []);

  const [detail, setDetail] = useState(BOOK_DETAIL_INFO);
  const [selectedValue, setSelectedValue] = useState<number>();
  const [round, setRound] = useState(1);
  const [bookerInfo, setBookerInfo] = useState({
    bookerName: "",
    bookerPhoneNumber: "",
    birthDate: "",
  });
  const [easyPassword, setEasyPassword] = useState({
    password: "",
    passwordCheck: "",
  });
  const [isTermChecked, setIsTermChecked] = useState({
    term1: false,
    term2: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(false);

  const handleRadioChange = (value: number) => {
    setSelectedValue(value);
  };

  const onChangeBookerInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBookerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeEasyPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEasyPassword((prev) => ({ ...prev, [name]: value }));
  };

  const onMinusClick = () => {
    setRound((prev) => prev - 1);
  };

  const onPlusClick = () => {
    setRound((prev) => prev + 1);
  };

  const onChangeTermCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setIsTermChecked((prev) => ({ ...prev, [name]: checked }));
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
    // TODO: 티켓 매수 요청 get 요청 후, true 인 상태이면, 바텀 시트 열기

    let formData = {
      scheduleId: performanceId,
      selectedValue,
      purchaseTicketCount: round,
      totalPaymentAmount: detail.ticketPrice * round,
    } as FormData;

    // TODO: 회원, 비회원 여부에 따라서 예매하기 post 요청
    if (isNonMember) {
      // 비회원 예매하기 post 요청
      formData = { ...formData, ...bookerInfo, password: easyPassword.password } as FormData;

      console.log(formData);
    } else {
      // 회원 예매하기 post 요청
      formData = {
        ...formData,
        bookerName: bookerInfo.bookerName,
        bookerPhoneNumber: bookerInfo.bookerPhoneNumber,
      } as FormData;
    }

    // TODO: response로 변경
    console.log(formData, {
      state: {
        bankName: "농협",
        accountNumber: "3561202376833",
        totalPaymentAmount: formData.totalPaymentAmount,
      },
    });

    // TODO: 요청 성공 시, 완료 페이지로 navigate
    navigate("/book/complete", {
      state: {
        bankName: "농협",
        accountNumber: "3561202376833",
        totalPaymentAmount: formData.totalPaymentAmount,
      },
    });
  };

  useEffect(() => {
    if (
      selectedValue &&
      bookerInfo.bookerName &&
      bookerInfo.bookerPhoneNumber &&
      isTermChecked.term2
    ) {
      if (
        isNonMember &&
        isTermChecked.term1 &&
        easyPassword.password === easyPassword.passwordCheck
      ) {
        setActiveButton(true);
      } else {
        setActiveButton(false);
      }
    } else {
      setActiveButton(false);
    }
  }, [isNonMember, selectedValue, bookerInfo, easyPassword, isTermChecked]);

  return (
    <S.ContentWrapper>
      <Info
        genre={detail.genre as SHOW_TYPE_KEY}
        title={detail.performanceTitle}
        teamName={detail.performanceTeamName}
        venue={detail.performanceVenue}
        period={detail.performancePeriod}
      />
      <S.Divider />
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
      <BookerInfo
        isNonMember={isNonMember}
        bookerInfo={bookerInfo}
        onChangeBookerInfo={onChangeBookerInfo}
      />
      {isNonMember && (
        <EasyPassEntry
          password={easyPassword.password}
          passwordCheck={easyPassword.passwordCheck}
          onChangeEasyPassword={onChangeEasyPassword}
        />
      )}

      <TermCheck
        isNonMember={isNonMember}
        isTermChecked={isTermChecked}
        onClickTermCheck={onChangeTermCheck}
      />
      <S.FooterContainer>
        <Button disabled={!activeButton} onClick={handleClickBook}>
          예매하기
        </Button>
      </S.FooterContainer>

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
        <Context subTitle="예매자" text={bookerInfo.bookerName} />
        <OuterLayout gap="1.1rem" margin="2.4rem 0 0 0">
          <Button variant="gray" size="medium" onClick={handleSheetClose}>
            다시 할게요
          </Button>
          <Button variant="primary" size="medium" onClick={handleClickBookRequst}>
            예매할게요
          </Button>
        </OuterLayout>
      </ViewBottomSheet>
    </S.ContentWrapper>
  );
};

export default Book;
