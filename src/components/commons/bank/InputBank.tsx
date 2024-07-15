import { ButtonHTMLAttributes } from "react";
import * as S from "./Bank.styled";

export interface InputBankProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bankOpen: boolean;
  onClick: () => void;
  children: string;
  isDisabled: boolean;
}

const InputBank = ({ isDisabled, bankOpen, onClick, children }: InputBankProps) => {
  const handleOnClick = (isDisableddd: boolean) => {
    if (!isDisableddd) {
      onClick();
    }
  };
  return (
    <S.InputBank
      $isDisabled={isDisabled}
      onClick={() => handleOnClick(isDisabled)}
      $hasChildren={!!children}
    >
      {children ? children : "은행을 선택해주세요."}
      <S.ToggleIcon $bankOpen={bankOpen} />
    </S.InputBank>
  );
};

export default InputBank;
