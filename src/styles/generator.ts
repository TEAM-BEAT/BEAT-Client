import { css } from "styled-components";

export const Generators = {
  flexGenerator: (flexDirection = "row", alignItems = "center", justifyContent = "center") => css`
    display: flex;
    flex-direction: ${flexDirection};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
  `,
  fontGenerator: (
    fontSize = "1.6rem",
    fontWeight = "normal",
    lineHeight = "normal",
    letterSpacing = "normal",
    fontStyle = "normal"
  ) => css`
    font-weight: ${fontWeight};
    font-size: ${fontSize};
    font-style: ${fontStyle};
    line-height: ${lineHeight};
    letter-spacing: ${letterSpacing};
  `,
};
