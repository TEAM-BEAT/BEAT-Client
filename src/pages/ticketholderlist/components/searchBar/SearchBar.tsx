import React from "react";
import * as S from "./SearchBar.styled";

interface SearchBarProps {
  status: string;
  handleFilter: () => void;
}

const SearchBar = ({ handleFilter, status }: SearchBarProps) => {
  return (
    <S.SearchBarWrapper>
      <S.SearchBar type="text" placeholder="예매자를 검색해보세요."></S.SearchBar>
      {status === "DEFAULT" && <S.FilterBtn onClick={handleFilter} />}
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
