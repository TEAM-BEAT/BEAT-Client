import React from "react";
import * as S from "./SearchBar.styled";

interface SearchBarProps {
  status: string;
  searchWord: string;
  handleFilterSheet: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFilter: boolean;
}

const SearchBar = ({
  handleFilterSheet,
  status,
  handleInputChange,
  searchWord,
  isFilter,
}: SearchBarProps) => {
  return (
    <S.SearchBarWrapper>
      <S.SearchBarLayout>
        <S.SearchIcon />
        <S.SearchBar
          type="text"
          placeholder="예매자를 검색해보세요."
          value={searchWord}
          onChange={handleInputChange}
        ></S.SearchBar>
      </S.SearchBarLayout>
      {status === "DEFAULT" && <S.FilterBtn onClick={handleFilterSheet} $isFilter={isFilter} />}
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
