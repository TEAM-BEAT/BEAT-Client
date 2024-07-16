import { BANK_LIST } from "@constants/bankList";
import { useEffect } from "react";
import Spacing from "../../spacing/Spacing";
import * as S from "../Bank.styled";
import BankBtn from "./BankBtn";

export interface BankBottomSheetProps {
  value: string;
  isOpen: boolean;
  onBankClick: (value: string) => void;
  onOutClick: () => void;
}

const BankBottomSheet = ({ value, isOpen, onBankClick, onOutClick }: BankBottomSheetProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <S.BankLayout $isOpen={isOpen}>
        <S.BankTitle>은행을 선택해주세요</S.BankTitle>
        <Spacing marginBottom={"3.2"} />
        <S.BankWrapper>
          {BANK_LIST.map((bank) => {
            return (
              <BankBtn key={bank.id} onClick={() => onBankClick(bank.name)} icon={<bank.bankImg />}>
                {bank.nameKr}
              </BankBtn>
            );
          })}
        </S.BankWrapper>
      </S.BankLayout>
      <S.OutLayout onClick={onOutClick} $isOpen={isOpen} />
    </>
  );
};

export default BankBottomSheet;
