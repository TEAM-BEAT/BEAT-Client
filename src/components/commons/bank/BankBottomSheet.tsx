import { BANK_LIST } from "@constants/bankList";
import Spacing from "../spacing/Spacing";
import * as S from "./Bank.styled";
import BankBtn from "./BankBtn";

export interface BankBottomSheetProps {
  onClick: () => void;
}

const BankBottomSheet = ({ onClick }: BankBottomSheetProps) => {
  return (
    <>
      <S.BankLayout>
        <S.BankTitle>은행을 선택해주세요</S.BankTitle>
        <Spacing marginBottom={"3.2"} />
        <S.BankWrapper>
          {BANK_LIST.map((bank, index) => {
            return <BankBtn key={index}>{bank.name}</BankBtn>;
          })}
        </S.BankWrapper>
      </S.BankLayout>
      <S.OutLayout onClick={onClick} />
    </>
  );
};

export default BankBottomSheet;
