import { ReactNode } from "react";
import * as S from "./BottomSheet.styled";

export interface BottomSheetPropType {
  isOpen: boolean;
  children?: ReactNode;
  title?: string;
}

const BottomSheet = ({ isOpen, title, children }: BottomSheetPropType) => {
  return (
    <S.BottomSheetWrapper isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
      <S.BottomSheetLayout>
        <S.Title>{title}</S.Title>
        {children}
      </S.BottomSheetLayout>
    </S.BottomSheetWrapper>
  );
};

export default BottomSheet;
