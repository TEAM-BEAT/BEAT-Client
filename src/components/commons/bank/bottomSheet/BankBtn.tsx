import { ReactNode } from "react";
import * as S from "../Bank.styled";

export interface BankBtnProps {
  onClick: (value: string) => void;
  children: string;
  icon: ReactNode;
}

const BankBtn = ({ onClick, icon, children }: BankBtnProps) => {
  const handleClick = () => {
    onClick(children);
  };

  return (
    <S.BankBtnWrapper onClick={handleClick}>
      {icon}
      <S.BankName>{children}</S.BankName>
    </S.BankBtnWrapper>
  );
};

export default BankBtn;
