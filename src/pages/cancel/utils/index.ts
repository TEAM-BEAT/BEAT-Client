import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

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
  accountHolder: string
) => {
  if (isDeposit === null) {
    return false;
  }

  if (isDeposit) {
    return !!(bankName && accountNumber && accountHolder);
  }

  return true;
};
