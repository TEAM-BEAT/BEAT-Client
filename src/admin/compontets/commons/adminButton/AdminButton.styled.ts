import styled, { css } from "styled-components";

export const AdminButton = styled.button<{ $variant: string }>`
  align-items: center;
  justify-content: center;

  ${({ $variant }) => {
    switch ($variant) {
      case "primary":
        return css`
          width: 15.8rem;
          height: 4.6rem;
          padding: 1.2rem 1.4rem;

          color: ${({ theme }) => theme.colors.white};

          ${({ theme }) => theme.fonts["body1-normal-semi"]};
          background-color: ${({ theme }) => theme.colors.pink_400};
        `;
      case "brand":
        return css`
          width: 15.8rem;
          height: 4.6rem;
          padding: 1.2rem 1.4rem;

          color: ${({ theme }) => theme.colors.black};

          ${({ theme }) => theme.fonts["body2-normal-semi"]};
          background-color: ${({ theme }) => theme.colors.yellow_400};
        `;
      case "line":
        return css`
          width: 19rem;
          height: 4.6rem;
          padding: 1.3rem 1.6rem;

          color: ${({ theme }) => theme.colors.pink_400};

          ${({ theme }) => theme.fonts["body2-normal-semi"]};
          background-color: ${({ theme }) => theme.colors.black};
          border: 0.1rem solid;
          border-color: ${({ theme }) => theme.colors.pink_400};
        `;
      case "gray":
        return css`
          width: 8.4rem;
          height: 6.4rem;
          padding: 1.3rem 1.4rem;

          color: ${({ theme }) => theme.colors.gray_300};

          ${({ theme }) => theme.fonts["body2-normal-medi"]};
          background-color: ${({ theme }) => theme.colors.gray_800};
          border: 0.2rem solid;
          border-color: ${({ theme }) => theme.colors.gray_400};
        `;
    }
  }}

  border-radius: 6px;
`;
