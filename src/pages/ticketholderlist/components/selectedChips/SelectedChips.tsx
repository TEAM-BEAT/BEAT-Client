import React from "react";
import * as S from "./SelectedChips.styled";

const SelectedChips = () => {
  // TODO: delteIcon에 삭제 기능 추가하기
  const handleClickDelete = () => {};

  return (
    // TODO : 선택된 필터 props로 받아서 map 돌리기
    <S.SelectedChipsWrapper>
      <S.Chip>
        1회차
        <S.DeleteIcon onClick={handleClickDelete} />
      </S.Chip>
    </S.SelectedChipsWrapper>
  );
};

export default SelectedChips;
