import * as S from "./ActionBottomSheetStyle";

import BottomSheet from "../BottomSheet";
import ContextBox from "@components/commons/contextBox/ContextBox";
import Context from "@components/commons/contextBox/Context";

const ActionBottomSheet = ({ ...rest }) => {
  return (
    <S.ActionBottomSheetWrapper>
      <BottomSheet title={"title"}>
        <ContextBox padding="2.4rem 2rem">
          <Context isDate={true} subTitle="날짜" date="20XX. XX. XX" time="XX:XX" />
          <Context subTitle="가격" text="100,000원 (2매)" />
          <Context subTitle="예매자" text="서지우" />
        </ContextBox>
      </BottomSheet>
    </S.ActionBottomSheetWrapper>
  );
};

export default ActionBottomSheet;
