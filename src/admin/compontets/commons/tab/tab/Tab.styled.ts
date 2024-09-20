import styled from "styled-components";

export const TabWrapper = styled.button<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  width: 8rem;

  color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.white : theme.colors.gray_400)};
`;

export const TabText = styled.div`
  text-align: center;
  ${({ theme }) => theme.fonts.heading1};
`;

export const TabBar = styled.div<{ $isSelected: boolean }>`
  align-self: stretch;
  height: 0.2rem;

  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.white : theme.colors.gray_400};
`;
