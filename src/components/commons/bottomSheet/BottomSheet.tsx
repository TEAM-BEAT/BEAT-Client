import React, { ReactNode } from "react";
import * as S from "./BottomSheet.styled";

export interface BottomSheetPropType {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  title?: string;
}

const BottomSheet = ({ title, children }: BottomSheetPropType) => {
  return (
    <S.BottomSheetWrapper onClick={(e) => e.stopPropagation()}>
      <S.BottomSheetLayout>
        <S.Title>{title}</S.Title>
        {children}
      </S.BottomSheetLayout>
    </S.BottomSheetWrapper>
  );
};

export default BottomSheet;
