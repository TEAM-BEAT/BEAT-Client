import styled from "styled-components";
import { BtnFilter, IconSearch } from "@assets/svgs";

export const SearchBarWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 32.7rem;
`;

export const SearchBarLayout = styled.section<{ $isFilterBtn: boolean }>`
  display: flex;
  align-items: center;
  width: ${({ $isFilterBtn }) => ($isFilterBtn ? "26.7rem" : "32.7rem")};
  height: 4.8rem;
  padding: 1.2rem 1.3rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.gray_700};
  border-radius: 4rem;
`;

export const SearchIcon = styled(IconSearch)`
  width: 2.4rem;
  height: 2.4rem;

  path {
    fill: ${({ theme }) => theme.colors.gray_300};
  }
`;

export const SearchBar = styled.input`
  width: 100%;
  height: 2.4rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};

  background-color: ${({ theme }) => theme.colors.gray_800};
`;

export const FilterBtnWrapper = styled.button<{ $isFilter: boolean }>`
  display: flex;
`;

export const FilterBtn = styled(BtnFilter)<{ $isFilter: boolean }>`
  display: flex;
  width: 4.8rem;
  height: 4.8rem;
  margin-left: 1.2rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border: 0.1rem solid
    ${({ theme, $isFilter }) => ($isFilter ? theme.colors.white : theme.colors.gray_700)};
  border-radius: 50%;

  svg {
    display: block;
    width: 4.8rem;
    height: 4.8rem;
  }
`;
