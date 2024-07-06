import React from "react";

import * as S from "./ViewBottomSheetStyle";

import BottomSheet from "../BottomSheet";
import ContextBox from "@components/commons/contextBox/ContextBox";
import Context from "@components/commons/contextBox/Context";

const ViewBottomSheet = ({ ...rest }) => {
  return (
    <S.ViewBottomSheetWrapper>
      <BottomSheet title={"title"}>
        <ContextBox padding="2rem 1.6rem">
          <S.BoxTitle customColor="pink_200">공연 제목</S.BoxTitle>
          <S.BoxDivider />
          {/* 사용 시 빠른 이해를 위해 임시로 넣어둔 context입니다. 사용 시 원하는 내용을 props로 넘겨주세요! */}
          {/* 날짜의 경우 isDate를 true로 주고, date와 time에 날짜와 시간을 넣어주면 됩니다. */}
          <Context isDate={true} subTitle="날짜" date="20XX. XX. XX" time="XX:XX" />
          <Context subTitle="가격" text="100,000원 (2매)" />
          <Context subTitle="예매자" text="서지우" />
        </ContextBox>
      </BottomSheet>
    </S.ViewBottomSheetWrapper>
  );
};

export default ViewBottomSheet;
