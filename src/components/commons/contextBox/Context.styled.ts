import styled from "styled-components";

import { subTitleStyle, textStyle } from "@typings/contextBoxProps";

export const ContextWrapper = styled.section`
  display: flex;

  background-color: ${({ theme }) => theme.colors.gray_700};
`;

export const ContextLayout = styled.section`
  display: flex;
  flex-direction: row;
`;

export const SubTitle = styled.div<subTitleStyle>`
  width: ${({ width = "5.4rem" }) => width};
  margin-right: ${({ marginRight = "0.8rem" }) => marginRight};

  color: ${({ theme }) => theme.colors.gray_400};

  ${({ theme, customFont = "body1-normal-medi" }) =>
    theme.fonts[customFont as keyof typeof theme.fonts]};
`;

export const Text = styled.section<textStyle>`
  width: ${({ width = "auto" }) => width};

  color: ${({ theme }) => theme.colors.white};

  ${({ theme, customFont = "body1-normal-medi" }) =>
    theme.fonts[customFont as keyof typeof theme.fonts]};
`;

export const DateBar = styled.div`
  height: 1.2rem;
  margin: 0.5rem 1rem 0;

  color: ${({ theme }) => theme.colors.gray_500};

  border-right: 0.1rem solid;
`;
