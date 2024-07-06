import styled, { css } from "styled-components";

import { contextBoxStyle } from "../../../types/contextBoxPropsTypes";

export const ContextBoxWrapper = styled.section`
  width: auto;
`;

export const ContextBoxLayout = styled.section<contextBoxStyle>`
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.gray_700};

  ${({
    width = "32.7rem",
    height = "auto",
    margin = "auto",
    padding = "auto",
    gap = "2rem",
    borderRadius = "0.6rem",
    alignItems = "flex-start",
    justifyContent = "center",
  }) => css`
    gap: ${gap};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    width: ${width};
    height: ${height};
    margin: ${margin};
    padding: ${padding};

    border-radius: ${borderRadius};
  `}
`;
