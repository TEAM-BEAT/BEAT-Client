import React from "react";
import * as S from "./NonExistent.styled";

const NonExistent = () => {
  return (
    <S.NonExistentWrapper>
      <S.NonExistenLayout>
        <S.EmptyImg />
        <S.EmptyText>아직 예매한 공연이 없어요.</S.EmptyText>
      </S.NonExistenLayout>
    </S.NonExistentWrapper>
  );
};

export default NonExistent;
