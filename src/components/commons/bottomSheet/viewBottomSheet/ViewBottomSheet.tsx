import * as S from "./ViewBottomSheetStyle";

import BottomSheet from "../BottomSheet";
import ContextBox from "@components/commons/contextBox/ContextBox";
import { ReactNode } from "react";

interface viewBottomSheetPropType {
  children?: ReactNode;
}

const ViewBottomSheet = ({ children, ...rest }: viewBottomSheetPropType) => {
  return (
    <S.ViewBottomSheetWrapper>
      <BottomSheet title={"title"}>
        <ContextBox padding="2rem 1.6rem">
          <S.BoxTitle customColor="pink_200">공연 제목</S.BoxTitle>
          <S.BoxDivider />
          {children}
        </ContextBox>
      </BottomSheet>
    </S.ViewBottomSheetWrapper>
  );
};

export default ViewBottomSheet;
