import { ButtonHTMLAttributes } from "react";
import * as S from "./Bank.styled";

export interface InputBankProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: string;
}

const InputBank = ({ onClick, children }: InputBankProps) => {
  return (
    <S.InputBank onClick={onClick} $hasChildren={!!children}>
      {children ? children : "은행을 선택해주세요."}
      <S.ToggleIcon />
    </S.InputBank>
  );
};

export default InputBank;
