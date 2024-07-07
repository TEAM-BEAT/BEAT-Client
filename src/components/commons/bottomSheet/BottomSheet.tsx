import { ReactNode } from "react";
import * as S from "./BottomSheet.styled";

export interface BottomSheetPropType {
  children?: ReactNode;
  title?: string;
}

const BottomSheet = ({ title, children }: BottomSheetPropType) => {
  return (
    <S.BottomSheetWrapper>
      <S.BottomSheetLayout>
        <S.Title>{title}</S.Title>
        {children}
      </S.BottomSheetLayout>
    </S.BottomSheetWrapper>
  );
};

export default BottomSheet;
