import styled, { css } from "styled-components";

export const LinkButtonWrapper = styled.button<{ $isLink: boolean }>`
  display: flex;
  align-items: center;
  width: 19rem;
  height: 4.6rem;

  color: ${({ theme, $isLink }) => ($isLink ? theme.colors.white : theme.colors.gray_500)};

  background-color: ${({ theme }) => theme.colors.gray_900};
  border-radius: 0.6rem;
  ${({ theme }) => theme.fonts["body2-normal-medi"]};

  ${({ $isLink }) =>
    !$isLink &&
    css`
      justify-content: center;
    `}
`;
