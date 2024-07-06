import React from "react";

import * as S from "./ViewBottomSheetStyle";

import BottomSheet from "../BottomSheet";
import ContextBox from "@components/commons/contextBox/ContextBox";
import Context from "@components/commons/contextBox/Context";

const ViewBottomSheet = () => {
  return (
    <S.ViewBottomSheetWrapper>
      <BottomSheet title={"title"}>
        <ContextBox padding="2rem 1.6rem">
          <Context subTitle="가격" text="100,000원 (2매)" />
          <Context subTitle="가격" text="100,000원 (2매)" />
        </ContextBox>
      </BottomSheet>
    </S.ViewBottomSheetWrapper>
  );
};

export default ViewBottomSheet;
