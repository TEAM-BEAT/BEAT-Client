import styled, { css } from "styled-components";

import { contentBoxStyle } from "../../../types/contextBoxPropsTypes";

export const ContentBoxWrapper = styled.section`
  display: flex;
`;

export const ContentBoxLayout = styled.section<contentBoxStyle>`
  flex-direction: column;

  background: ${({ theme }) => theme.colors.gray_700};

  ${({
    width = "32.7rem",
    height = "auto",
    margin = "auto",
    padding = "auto",
    borderRadius = "0.6rem",
    alignItems = "flex-start",
    justifyContent = "center",
  }) => css`
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    width: ${width};
    height: ${height};
    margin: ${margin};
    padding: ${padding};

    border-radius: ${borderRadius};
  `}
`;
