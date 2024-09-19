import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const global = createGlobalStyle`

    ${reset}
    
    * {
    box-sizing: border-box;
    }

    html {
    font-size: 62.5%;

    background-color: ${({ theme }) => theme.colors.gray_900};

    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color:rgb(0 0 0 / 0%);
    scroll-behavior: smooth; 
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
    background-color: transparent;
    outline: none;
    border: none;
    }

    button {
    padding: 0;

    cursor: pointer;
    }

    input {
    appearance: none;

    &:focus {
        outline: none;
    }
    }

    /* 모바일뷰 세팅 */
    body {
        width: 375px; 
        min-height: 100%;
        margin: 0 auto; 
        overflow-x: hidden;

        color: ${({ theme }) => theme.colors.white};

        background-color: ${({ theme }) => theme.colors.gray_900}; 
    }
    
    /* 데스크탑뷰 세팅 */

    @media (width >= 1440px) {
        body {
            width: 100%;
            max-width: 1440px; 

            background-color: ${({ theme }) => theme.colors.black}; 
        }
    }
`;

export default global;
