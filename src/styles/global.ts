import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const global = createGlobalStyle`

    ${reset}
    
    * {
    box-sizing: border-box;
    }
    
    body {
        /* background-color: ${({ theme }) => theme.colors.gray900};; */
    }

    html {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color:rgb(0 0 0 / 0%);
    scroll-behavior: smooth;

    font-size: 62.5%;
    user-select: none;

    }
    ul, li {
    padding-left: 0;
    list-style: none;
    }

    a {
    color: inherit;

    text-decoration: none;
    }

    input, button {
    outline: none;

    border: none;
    background-color: transparent;
    }

    button {
    cursor: pointer;

    padding: 0;
    }

    input {
    appearance: none;

    &:focus {
        outline: none;
    }
    }

`;

export default global;
