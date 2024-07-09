import { ButtonHTMLAttributes } from "react";
import * as S from "./Bank.styled";

export interface BankBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const BankBtn = ({ children }: BankBtnProps) => {
  return (
    <S.BankBtnWrapper>
      <S.BankImg />
      <S.BankName>{children}</S.BankName>
    </S.BankBtnWrapper>
  );
};

export default BankBtn;
