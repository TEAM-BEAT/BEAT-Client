import { css } from "styled-components";

export const Generators = {
  flexGenerator: (flexDirection = "row", alignItems = "center", justifyContent = "center") => css`
    display: flex;
    flex-direction: ${flexDirection};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
  `,
};
