import React from "react";
import * as S from "./SearchBar.styled";

interface SearchBarProps {
  status: string;
  searchWord: string;
  handleFilterSheet: () => void;
  handleInputChange: () => void;
}

// TODO: 필터 적용되었을 때 아웃라인 색상 적용 -> 기능 붙일 때 같이 하기
const SearchBar = ({
  handleFilterSheet,
  status,
  handleInputChange,
  searchWord,
}: SearchBarProps) => {
  return (
    <S.SearchBarWrapper>
      <S.SearchBar
        type="text"
        placeholder="예매자를 검색해보세요."
        value={searchWord}
        onChange={handleInputChange}
      ></S.SearchBar>
      {status === "DEFAULT" && <S.FilterBtn onClick={handleFilterSheet} />}
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
