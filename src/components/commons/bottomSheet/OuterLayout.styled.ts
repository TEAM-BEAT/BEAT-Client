import styled, { css } from "styled-components";

export interface OuterLayoutStyle {
  width?: string;
  height?: string;
  gap?: string;
  margin?: string;
  padding?: string;
}

export const OuterLayoutWrapper = styled.section<OuterLayoutStyle>`
  display: flex;

  ${({ width = "auto", height = "auto", margin = "auto", padding = "auto", gap = "1.1rem" }) => css`
    gap: ${gap};
    width: ${width};
    height: ${height};
    margin: ${margin};
    padding: ${padding};
  `}
`;
