import * as S from "./ViewBottomSheetStyle";

import BottomSheet from "../BottomSheet";
import ContextBox from "@components/commons/contextBox/ContextBox";
import { ReactNode } from "react";

interface viewBottomSheetPropsTypes {
  title?: string;
  boxTitle?: string;
  children?: ReactNode;
}

const ViewBottomSheet = ({ title, boxTitle, children, ...rest }: viewBottomSheetPropsTypes) => {
  return (
    <S.ViewBottomSheetWrapper>
      <BottomSheet title={title}>
        <ContextBox customPadding="2rem 1.6rem">
          <S.BoxTitle customColor="pink_200">{boxTitle}</S.BoxTitle>
          <S.BoxDivider />
          {children}
        </ContextBox>
      </BottomSheet>
    </S.ViewBottomSheetWrapper>
  );
};

export default ViewBottomSheet;
