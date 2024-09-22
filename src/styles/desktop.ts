import { createGlobalStyle } from "styled-components";

const DesktopGlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    max-width: 1440px;

    background-color: ${({ theme }) => theme.colors.black};
  }
`;

export default DesktopGlobalStyle;
