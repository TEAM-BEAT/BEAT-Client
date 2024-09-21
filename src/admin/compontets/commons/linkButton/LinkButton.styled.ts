import styled, { css } from "styled-components";

export const LinkButtonWrapper = styled.button<{ $isLink: boolean }>`
  display: block;
  align-items: center;
  width: 19rem;
  height: 4.6rem;
  padding: 1.3rem 1.4rem;
  overflow: hidden;

  color: ${({ theme, $isLink }) => ($isLink ? theme.colors.white : theme.colors.gray_500)};
  text-overflow: ellipsis;

  background-color: ${({ theme }) => theme.colors.gray_900};
  border-radius: 0.6rem;
  ${({ theme }) => theme.fonts["body2-normal-medi"]};

  ${({ $isLink }) =>
    !$isLink &&
    css`
      justify-content: center;
    `}
`;
