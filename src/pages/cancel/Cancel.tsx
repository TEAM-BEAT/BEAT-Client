import {
  BankBottomSheet,
  Button,
  InputAccountWrapper,
  InputBank,
  Spacing,
  TextField,
  Toast,
} from "@components/commons";
import { NAVIGATION_STATE } from "@constants/navigationState";
import { useHeader, useModal } from "@hooks";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { convertingNumber } from "@constants/convertingNumber";
import * as S from "./Cancel.styled";
import RadioButton from "./../cancel/components/select/RadioButton";
import { handleChange, handleBankClick, isFormValid } from "./utils";
import { useCancelBooking } from "../../hooks/useCancelBooking";
import { numericFilter } from "@utils/useInputFilter";
import { BOOKING_STATUS } from "@constants/bookingStatus";

const Cancel = () => {
  const { setHeader } = useHeader();
  const { openAlert } = useModal();
  const { state } = useLocation();
  const { confirmCancelAction } = useCancelBooking(state?.name, state?.phone, state?.password);
  const navigate = useNavigate();
  const [isDeposit, setIsDeposit] = useState<boolean | null>(null);
  const [bankOpen, setBankOpen] = useState(false);
  const [bankName, setbankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  useEffect(() => {
    if (!state) {
      const user = localStorage.getItem("user");
      openAlert({
        title: "잘못된 접근입니다.",
        okText: "확인",
        okCallback: () => navigate(user ? "/lookup" : "/main"),
      });
    }

    if (state.bookingDetails.bookingStatus === BOOKING_STATUS.BOOKING_CONFIRMED) {
      setIsDeposit(true);
    }
  }, []);

  if (!state) {
    return;
  }

  const performanceDateArray = state.bookingDetails.performanceDate.split("-");
  const performanceDataDate = performanceDateArray[2].split("T");

  const handleLeftBtn = () => {
    navigate(-1);
  };

  const handleBankOpen = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setHeader({
      headerStyle: NAVIGATION_STATE.ICON_TITLE,
      title: "예매 취소하기",
      leftOnClick: handleLeftBtn,
    });
  }, [setHeader]);

  const handleCancelClick = (isDeposit) => {
    const requestData = {
      bookingId: state.bookingDetails.bookingId,
      ...(isDeposit && {
        bankName: bankName,
        accountNumber: accountNumber,
        accountHolder: accountHolder,
      }),
    };

    confirmCancelAction(requestData);
    alert("hi");
  };

  if (!state) {
    return null;
  }

  return (
    <S.CancelLayout>
      <S.PerformWrapper>
        <S.PerformBox>
          <p>{state.bookingDetails.performanceTitle}</p>
          <table>
            <tr>
              <th scope="row">관람일</th>
              <td>
                {performanceDateArray[0]}년 {performanceDateArray[1]}월 {performanceDataDate[0]}일
              </td>
            </tr>
            <tr>
              <th scope="row">회차</th>
              <td>{convertingNumber(state.bookingDetails.scheduleNumber)}회차</td>
            </tr>
          </table>
        </S.PerformBox>
        <S.PriceBox>
          <p>{state.bookingDetails.totalPaymentAmount.toLocaleString()}원</p>
          <S.Divider />
          <p>{state.bookingDetails.purchaseTicketCount}매</p>
        </S.PriceBox>
      </S.PerformWrapper>
      {state.bookingDetails.bookingStatus !== BOOKING_STATUS.BOOKING_CONFIRMED && (
        <>
          <Spacing marginBottom="3.2" />
          <S.Title>티켓값을 입금하셨나요?</S.Title>
          <Spacing marginBottom="2" />
          <S.RadioWrapper>
            <RadioButton
              label="입금 전이에요"
              value={1}
              checked={isDeposit === false}
              onChange={() => setIsDeposit(false)}
            />
            <RadioButton
              label="입금했어요"
              value={0}
              checked={isDeposit === true}
              onChange={() => setIsDeposit(true)}
            />
          </S.RadioWrapper>
        </>
      )}
      {(isDeposit || state.bookingDetails.bookingStatus === BOOKING_STATUS.BOOKING_CONFIRMED) && (
        <>
          <Spacing marginBottom="1.6" />
          <InputAccountWrapper label="환불받으실 계좌를 입력해 주세요.">
            <InputBank
              isDisabled={false}
              bankOpen={bankOpen}
              onClick={() => handleBankOpen(setBankOpen)}
            >
              {bankName}
            </InputBank>
            <TextField
              name="accountNumber"
              value={accountNumber}
              onChange={(e) => handleChange(e, setAccountNumber)}
              filter={numericFilter}
              placeholder="입금 받으실 계좌번호를 (-) 제외 숫자만 입력해주세요."
              inputMode="numeric"
            />
            <TextField
              name="accountHolder"
              value={accountHolder}
              onChange={(e) => handleChange(e, setAccountHolder)}
              placeholder="예금주명을 입력해주세요."
            />
          </InputAccountWrapper>
        </>
      )}
      <BankBottomSheet
        value={bankName}
        onBankClick={(value) => handleBankClick(value, setbankName, setbankName, setBankOpen)}
        isOpen={bankOpen}
        onOutClick={() => handleBankOpen(setBankOpen)}
      />
      <S.ButtonWrapper>
        <Button
          onClick={() => handleCancelClick(isDeposit)}
          disabled={
            !isFormValid(
              isDeposit,
              bankName,
              accountNumber,
              accountHolder,
              state.bookingDetails.bookingStatus
            )
          }
        >
          취소하기
        </Button>
      </S.ButtonWrapper>
    </S.CancelLayout>
  );
};

export default Cancel;
