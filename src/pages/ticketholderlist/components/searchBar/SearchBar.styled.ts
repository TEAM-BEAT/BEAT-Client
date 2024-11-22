import styled from "styled-components";

export const SearchBarWrapper = styled.section`
  display: flex;
  flex-direction: row;
  width: 32.7rem;
`;

export const SearchBar = styled.input`
  width: 100%;
  height: 4.8rem;
  padding: 1.3rem;

  color: ${({ theme }) => theme.colors.gray_600};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};

  background-color: ${({ theme }) => theme.colors.gray_800};
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.gray_700};
  border-radius: 4rem;
`;

export const FilterBtn = styled.button`
  width: 4.8rem;
  height: 4.8rem;
  margin-left: 1.2rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.gray_700};
  border-radius: 50%;
`;
