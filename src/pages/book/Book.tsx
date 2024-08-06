import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GuestBookingRequest } from "@apis/domains/bookings/api";
import { useGuestBook, useMemberBook } from "@apis/domains/bookings/queries";
import {
  useGetBookingPerformanceDetail,
  useGetScheduleAvailable,
} from "@apis/domains/performances/queries";
import { Button, Context, Loading, OuterLayout, ViewBottomSheet } from "@components/commons";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useLogin, useModal } from "@hooks";
import { BookerInfo, Count, EasyPassEntry, Info, Select, TermCheck } from "@pages/book/components";
import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import * as S from "./Book.styled";
import { getScheduleNumberById } from "./utils";
import MetaTag from "@components/commons/meta/MetaTag";

const Book = () => {
  const navigate = useNavigate();
  const { performanceId } = useParams<{ performanceId: string }>();
  const { openAlert } = useModal();

  const { data, isLoading } = useGetBookingPerformanceDetail(Number(performanceId));

  const { isLogin } = useLogin();
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE_SUB_TEXT,
      title: "예매하기",
      leftOnClick: () => {
        navigate(`/gig/${performanceId}`);
      },
    });
  }, []);

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

  const { data: availableTicket, refetch } = useGetScheduleAvailable(
    selectedValue as number,
    round
  );

  const { mutateAsync, isPending } = useGuestBook();
  const { mutateAsync: memberBook, isPending: isMemberRequestPending } = useMemberBook();

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

  const handleClickBook = async () => {
    const res = await refetch();

    if (res.data === 409) {
      openAlert({
        title: "잔여 티켓 수가 선택한\n 티켓의 수량보다 적습니다.",
        okText: "다시 선택할게요",
      });

      return;
    }

    if (typeof res.data !== "number" && res.data?.isAvailable) {
      handleSheetOpen();
    }
  };

  const handleClickBookRequst = async () => {
    if (isPending && isMemberRequestPending) {
      return;
    }

    let formData = {
      scheduleId:
        data?.scheduleList![selectedValue! - data?.scheduleList?.[0].scheduleId].scheduleId,
      scheduleNumber: getScheduleNumberById(data?.scheduleList!, selectedValue!),
      purchaseTicketCount: round,
      totalPaymentAmount: (data?.ticketPrice ?? 0) * round,
    } as GuestBookingRequest;

    if (!isLogin) {
      // 비회원 예매 요청
      formData = {
        ...formData,
        ...bookerInfo,
        password: easyPassword.password,
        isPaymentCompleted: data?.ticketPrice === 0,
      } as GuestBookingRequest;

      const res = await mutateAsync(formData);

      // TODO: response로 변경하기 (API 수정 필요)
      navigate("/book/complete", {
        state: {
          id: performanceId,
          title: data?.performanceTitle,
          bankName: data?.bankName,
          accountHolder: data?.accountHolder,
          accountNumber: data?.accountNumber,
          totalPaymentAmount: res?.totalPaymentAmount,
        },
      });
    } else {
      // 회원 예매요청
      formData = {
        ...formData,
        bookerName: bookerInfo.bookerName,
        bookerPhoneNumber: bookerInfo.bookerPhoneNumber,
      } as GuestBookingRequest;

      console.log(formData);

      const res = await memberBook(formData);

      console.log(res);

      navigate("/book/complete", {
        state: {
          id: performanceId,
          title: data?.performanceTitle,
          bankName: data?.bankName,
          accountHolder: data?.accountHolder,
          accountNumber: data?.accountNumber,
          totalPaymentAmount: res?.totalPaymentAmount,
        },
      });
    }
  };

  useEffect(() => {
    if (
      selectedValue &&
      bookerInfo.bookerName &&
      bookerInfo.bookerPhoneNumber.length === 13 &&
      isTermChecked.term2
    ) {
      if (
        !isLogin &&
        isTermChecked.term1 &&
        easyPassword.password.length === 4 &&
        bookerInfo.birthDate.length === 6 &&
        easyPassword.password === easyPassword.passwordCheck
      ) {
        setActiveButton(true);
      } else {
        if (isLogin) {
          setActiveButton(true);
        } else {
          setActiveButton(false);
        }
      }
    } else {
      setActiveButton(false);
    }
  }, [isLogin, selectedValue, bookerInfo, easyPassword, isTermChecked]);

  return isLoading ? (
    <Loading />
  ) : (
    <S.ContentWrapper>
      <MetaTag title="공연 예매" />
      {isPending && <Loading />}
      <Info
        genre={data?.genre as SHOW_TYPE_KEY}
        posterImage={data?.posterImage}
        title={data?.performanceTitle ?? ""}
        teamName={data?.performanceTeamName ?? ""}
        venue={data?.performanceVenue ?? ""}
        period={data?.performancePeriod ?? ""}
      />
      <S.Divider />
      <Select
        selectedValue={selectedValue as number}
        handleRadioChange={handleRadioChange}
        scheduleList={data?.scheduleList ?? []}
      />
      <Count
        round={round}
        onMinusClick={onMinusClick}
        onPlusClick={onPlusClick}
        ticketPrice={data?.ticketPrice ?? 0}
        availableTicketCount={
          selectedValue
            ? data?.scheduleList![selectedValue - data?.scheduleList[0].scheduleId]
                ?.availableTicketCount
            : undefined
        }
      />
      <BookerInfo
        isNonMember={!isLogin}
        bookerInfo={bookerInfo}
        onChangeBookerInfo={onChangeBookerInfo}
      />
      {!isLogin && (
        <EasyPassEntry
          password={easyPassword.password}
          passwordCheck={easyPassword.passwordCheck}
          onChangeEasyPassword={onChangeEasyPassword}
        />
      )}

      <TermCheck
        isNonMember={!isLogin}
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
        boxTitle={data?.performanceTitle ?? ""}
        boxTitleColor="pink_200"
      >
        <Context
          isDate={true}
          subTitle="날짜"
          date={data
            ?.scheduleList![
              (selectedValue ?? data?.scheduleList?.[0].scheduleId) -
                data?.scheduleList?.[0].scheduleId
            ].performanceDate?.slice(0, 10)
            .toString()}
          time={data
            ?.scheduleList![
              (selectedValue ?? data?.scheduleList?.[0].scheduleId) -
                data?.scheduleList?.[0].scheduleId
            ].performanceDate?.slice(11, 16)
            .toString()}
        />
        <Context
          subTitle="가격"
          text={`${((data?.ticketPrice ?? 0) * round).toLocaleString()}원`}
        />
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
