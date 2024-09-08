import styled, { css } from "styled-components";

export const ButtonBox = styled.button<{
  $variant: "initial" | "selected" | "disabled";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;

  border: 1px solid;
  border-radius: 4px;
  ${({ theme }) => theme.fonts["body2-normal-medi"]};

  ${({ theme, $variant }) => {
    switch ($variant) {
      case "initial":
        return css`
          color: ${theme.colors.gray_200};

          border-color: ${({ theme }) => theme.colors.gray_600};
        `;

      case "selected":
        return css`
          color: ${theme.colors.white};

          background-color: ${theme.colors.pink_400};
          border-color: ${theme.colors.pink_400};
        `;

      case "disabled":
        return css`
          color: ${theme.colors.gray_700};

          border-color: ${theme.colors.gray_800};
        `;

      default:
        return css`
          color: ${theme.colors.gray_200};
          ${theme.fonts["body2-normal-medi"]};
        `;
    }
  }}
`;
