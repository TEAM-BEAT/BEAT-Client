import styled, { css } from "styled-components";

export const ButtonBox = styled.button<{
  $variant: "initial" | "selected" | "disabled";
}>`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 32.7rem;
  height: 6rem;
  padding: 1.2rem calc(1.6rem - 2px);

  color: ${({ $variant, theme }) =>
    $variant === "selected" ? theme.colors.gray_0 : theme.colors.gray_400};

  background-color: ${({ theme }) => theme.colors.gray_800};
  border: 2px solid
    ${({ $variant, theme }) => ($variant === "selected" ? theme.colors.pink_400 : "transparent")};
  border-radius: 6px;
  ${({ theme }) => theme.fonts["body1-normal-medi"]};

  svg {
    position: absolute;
    right: calc(1rem - 2px);
  }
`;
