import styled from "styled-components";

import { subTitleStyle, textStyle } from "../../../types/contextBoxPropsTypes";

export const ContextWrapper = styled.section`
  display: flex;
  flex-direction: row;
`;

export const SubTitle = styled.div<subTitleStyle>`
  width: ${({ width = "5.4rem" }) => width};
  margin-right: ${({ marginRight = "0.8rem" }) => marginRight};

  color: ${({ theme }) => theme.colors.gray_400};

  /* ${({ theme, customFont = "body1-normal-medi" }) =>
    theme.fonts[customFont as keyof typeof theme.fonts]}; */

  ${({ theme }) => theme.fonts["body1-normal-medi"]}
`;

export const Text = styled.section<textStyle>`
  width: ${({ width = "auto" }) => width};

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts["body1-normal-medi"]}
`;
