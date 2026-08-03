import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { BOOKING_STATUS } from "@constants/bookingStatus";

export const handleChange = (
  e: ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<string>>
) => {
  setState(e.target.value);
};

export const handleBankClick = (
  value: string,
  setState: Dispatch<SetStateAction<string>>,
  setbankName: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  setbankName(value);
  setState(value);
  setOpen(false);
};

export const isFormValid = (
  isDeposit: boolean | null,
  bankName: string,
  accountNumber: string,
  accountHolder: string,
  bookingStatus: string,
  totalPaymentAmount: number
) => {
  const shouldRequestRefund = requiresRefund(isDeposit, bookingStatus, totalPaymentAmount);

  if (shouldRequestRefund) {
    return !!(bankName && accountNumber && accountHolder);
  }

  if (totalPaymentAmount === 0 || bookingStatus === BOOKING_STATUS.BOOKING_CONFIRMED) {
    return true;
  }

  return isDeposit === false;
};

export const requiresRefund = (
  isDeposit: boolean | null,
  bookingStatus: string,
  totalPaymentAmount: number
) =>
  totalPaymentAmount > 0 &&
  (isDeposit === true || bookingStatus === BOOKING_STATUS.BOOKING_CONFIRMED);
