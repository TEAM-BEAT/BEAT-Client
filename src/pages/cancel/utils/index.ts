import React from "react";

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  setState(e.target.value);
};

export const handleBankClick = (
  value: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
  setbankName: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
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
