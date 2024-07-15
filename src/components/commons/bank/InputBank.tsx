import { ButtonHTMLAttributes } from "react";
import * as S from "./Bank.styled";

export interface InputBankProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bankOpen: boolean;
  onClick: () => void;
  children: string;
}

const InputBank = ({ bankOpen, onClick, children }: InputBankProps) => {
  return (
    <S.InputBank onClick={onClick} $hasChildren={!!children}>
      {children ? children : "은행을 선택해주세요."}
      <S.ToggleIcon $bankOpen={bankOpen} />
    </S.InputBank>
  );
};

export default InputBank;
