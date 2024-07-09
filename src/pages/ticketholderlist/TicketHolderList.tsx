import { useState } from "react";
import Banner from "./components/banner/Banner";
import NarrowDropDown from "./components/narrowDropDown/NarrowDropDown";
import eximg from "./constants/silkagel.png";
import * as S from "./TicketHolderList.styled";
const TicketHolderList = () => {
  const [reservedCount, setReservedCount] = useState(0);
  //이거 판매 완료되었는지 여부에 따라서 렌더링하는거 다르게 할지 물어보기, 색깔도 어떻게 할 지 물어보기
  const [isOutdated, setIsOutdated] = useState(false);

  return (
    <>
      <Banner image={eximg} reservedCount={reservedCount} isOutdated={isOutdated} />
      <S.BodyWrapper>
        <S.BodyLayout>
          <S.LayoutHeaderBox>
            <S.LayoutFilterBox>
              <NarrowDropDown />
              <NarrowDropDown />
            </S.LayoutFilterBox>
          </S.LayoutHeaderBox>
        </S.BodyLayout>
      </S.BodyWrapper>
    </>
  );
};

export default TicketHolderList;
