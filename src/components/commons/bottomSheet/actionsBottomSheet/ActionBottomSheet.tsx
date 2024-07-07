import * as S from "./ActionBottomSheet.styled";

import BottomSheet from "../BottomSheet";
import ContextBox from "@components/commons/contextBox/ContextBox";
import { ReactNode } from "react";

interface actionBottomSheetProps {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
}

const ActionBottomSheet = ({ title, subTitle, children }: actionBottomSheetProps) => {
  return (
    <S.ActionBottomSheetWrapper>
      <BottomSheet title={title}>
        <ContextBox customAlignItems="center" customPadding="2rem 2rem 2.4rem 2rem">
          <S.SubTitle>{subTitle}</S.SubTitle>
          {children}
        </ContextBox>
      </BottomSheet>
    </S.ActionBottomSheetWrapper>
  );
};

export default ActionBottomSheet;
