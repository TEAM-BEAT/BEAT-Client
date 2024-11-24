import styled from "styled-components";

export const SearchBarWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 32.7rem;
`;

export const SearchBar = styled.input`
  flex-grow: 1;
  height: 4.8rem;
  padding: 1.3rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};

  background-color: ${({ theme }) => theme.colors.gray_800};
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.gray_700};
  border-radius: 4rem;
`;

// 찌그러지는 거 수정하기
export const FilterBtn = styled.button`
  width: 4.8rem;
  height: 4.8rem;
  margin-left: 1.2rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.gray_700};
  border-radius: 50%;
`;
