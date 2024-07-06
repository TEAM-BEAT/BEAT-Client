import * as S from "./ActionBottomSheetStyle";

import BottomSheet from "../BottomSheet";
import ContextBox from "@components/commons/contextBox/ContextBox";
import PhoneNumber from "./phoneNumber/PhoneNumber";
import { ReactNode } from "react";

interface actionBottomSheetPropsTypes {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
}

const ActionBottomSheet = ({ title, subTitle, children }: actionBottomSheetPropsTypes) => {
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
