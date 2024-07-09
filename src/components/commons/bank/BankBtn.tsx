import * as S from "./Bank.styled";

export interface BankBtnProps {
  onClick: (value: string) => void;
  children: string;
}

const BankBtn = ({ onClick, children }: BankBtnProps) => {
  const handleClick = () => {
    onClick(children);
  };

  return (
    <S.BankBtnWrapper onClick={handleClick}>
      <S.BankImg />
      <S.BankName>{children}</S.BankName>
    </S.BankBtnWrapper>
  );
};

export default BankBtn;
