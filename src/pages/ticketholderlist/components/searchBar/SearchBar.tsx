import React, { useState } from "react";
import * as S from "./SearchBar.styled";

interface SearchBarProps {
  status: string;
  searchWord: string;
  handleFilterSheet: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFilter: boolean;
  hasBooking: boolean;
}

const SearchBar = ({
  handleFilterSheet,
  status,
  handleInputChange,
  searchWord,
  isFilter,
  hasBooking,
}: SearchBarProps) => {
  const [placeholder, setPlaceholder] = useState("예매자를 검색해보세요.");

  const handleFocus = () => {
    setPlaceholder("2글자 이상 입력해 주세요.");
  };

  const handleBlur = () => {
    setPlaceholder("예매자를 검색해보세요.");
  };

  const isFilterBtn = status === "DEFAULT" && hasBooking;

  return (
    <S.SearchBarWrapper>
      <S.SearchBarLayout>
        <S.SearchIcon />
        <S.SearchBar
          type="text"
          placeholder={placeholder}
          value={searchWord}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        ></S.SearchBar>
      </S.SearchBarLayout>
      {isFilterBtn && (
        <S.FilterBtnWrapper $isFilter={isFilter}>
          <S.FilterBtn onClick={handleFilterSheet} />
        </S.FilterBtnWrapper>
      )}
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
