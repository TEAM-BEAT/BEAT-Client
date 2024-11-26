import React, { ReactNode } from "react";
import * as S from "./BottomSheet.styled";

export interface BottomSheetPropType {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
  children?: ReactNode;
  title?: string;
  paddingTop?: string;
}

const BottomSheet = ({ isOpen, title, paddingTop, children }: BottomSheetPropType) => {
  return (
    <S.BottomSheetWrapper $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
      <S.BottomSheetLayout $paddingTop={paddingTop}>
        <S.Title>{title}</S.Title>
        {children}
      </S.BottomSheetLayout>
    </S.BottomSheetWrapper>
  );
};

export default BottomSheet;
