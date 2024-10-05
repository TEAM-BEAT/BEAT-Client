import styled from "styled-components";

export const AdminNavBarWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;
  width: 24.8rem;
  height: 90rem;
  padding: 3.2rem 0;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;

export const NavBtn = styled.button<{ $isSelected: boolean }>`
  display: flex;
  width: 24.8rem;
  padding: 1.4rem 0 1.4rem 4rem;

  ${({ theme }) => theme.fonts.heading4};
  color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.white : theme.colors.gray_400)};
`;
