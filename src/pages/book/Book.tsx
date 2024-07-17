import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GuestBookingRequest } from "@apis/domains/bookings/api";
import { useGuestBook } from "@apis/domains/bookings/queries";
import {
  useGetBookingPerformanceDetail,
  useGetScheduleAvailable,
} from "@apis/domains/performance/queries";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import ViewBottomSheet from "@components/commons/bottomSheet/viewBottomSheet/ViewBottomSheet";
import Button from "@components/commons/button/Button";
import Context from "@components/commons/contextBox/Context";
import Loading from "@components/commons/loading/Loading";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader } from "@hooks/useHeader";
import useModal from "@hooks/useModal";
import { SHOW_TYPE_KEY } from "@pages/gig/constants";
import * as S from "./Book.styled";
import BookerInfo from "./components/bookerInfo/BookerInfo";
import Count from "./components/count/Count";
import EasyPassEntry from "./components/easyPassEntry/EasyPassEntry";
import Info from "./components/info/Info";
import Select from "./components/select/Select";
import TermCheck from "./components/termCheck/TermCheck";
import { getScheduleNumberById } from "./utils";

const Book = () => {
  const navigate = useNavigate();
  const { performanceId } = useParams<{ performanceId: string }>();
  const { openAlert } = useModal();

  const { data, isLoading } = useGetBookingPerformanceDetail(Number(performanceId));

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
    // TODO: 티켓 매수 요청 get 요청 후 ? 예매 요청 ? 혹은 바로 요청 ? 이거 동시성 처리 됐나
    if (isPending) {
      return;
    }

    let formData = {
      scheduleId: data?.scheduleList![selectedValue! - 1].scheduleId,
      scheduleNumber: getScheduleNumberById(data?.scheduleList!, selectedValue!),
      purchaseTicketCount: round,
      totalPaymentAmount: data?.ticketPrice ?? 0 * round,
    } as GuestBookingRequest;

    // TODO: 회원, 비회원 여부에 따라서 예매하기 post 요청
    if (isNonMember) {
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
          bankName: "농협",
          accountNumber: "3561202376833",
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
    }
  };

  useEffect(() => {
    if (
      selectedValue &&
      bookerInfo.bookerName &&
      bookerInfo.birthDate.length === 6 &&
      bookerInfo.bookerPhoneNumber.length === 13 &&
      isTermChecked.term2
    ) {
      if (
        isNonMember &&
        isTermChecked.term1 &&
        easyPassword.password.length === 4 &&
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

  return isLoading ? (
    <Loading />
  ) : (
    <S.ContentWrapper>
      {isPending && <Loading />}
      <Info
        genre={data?.genre as SHOW_TYPE_KEY}
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
        // availableTicketCount={
        //   selectedValue ? data?.scheduleList![selectedValue - 1].availableTicketCount : undefined
        // }
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
        boxTitle={data?.performanceTitle ?? ""}
        boxTitleColor="pink_200"
      >
        <Context
          isDate={true}
          subTitle="날짜"
          date={data
            ?.scheduleList![(selectedValue ?? 1) - 1].performanceDate?.slice(0, 10)
            .toString()}
          time={data
            ?.scheduleList![(selectedValue ?? 1) - 1].performanceDate?.slice(11, 16)
            .toString()}
        />
        <Context subTitle="가격" text={`${(data?.ticketPrice ?? 0 * round).toLocaleString()}원`} />
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
