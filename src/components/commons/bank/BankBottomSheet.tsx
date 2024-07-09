import { BANK_LIST } from "@constants/bankList";
import Spacing from "../spacing/Spacing";
import * as S from "./Bank.styled";
import BankBtn from "./BankBtn";

export interface BankBottomSheetProps {
  value: string;
  onBankClick: (value: string) => void;
  onOutClick: () => void;
}

const BankBottomSheet = ({ value, onBankClick, onOutClick }: BankBottomSheetProps) => {
  return (
    <>
      <S.BankLayout>
        <S.BankTitle>은행을 선택해주세요</S.BankTitle>
        <Spacing marginBottom={"3.2"} />
        <S.BankWrapper>
          {BANK_LIST.map((bank, index) => {
            return (
              <BankBtn key={index} onClick={onBankClick}>
                {bank.name}
              </BankBtn>
            );
          })}
        </S.BankWrapper>
      </S.BankLayout>
      <S.OutLayout onClick={onOutClick} />
    </>
  );
};

export default BankBottomSheet;
