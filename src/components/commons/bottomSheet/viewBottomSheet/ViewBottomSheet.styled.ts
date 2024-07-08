import styled from "styled-components";

import { BoxTitleStyle, BoxDividerStyle } from "@typings/contextBoxProps";

export const ViewBottomSheetWrapper = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const BoxTitle = styled.h1<BoxTitleStyle>`
  display: inline;
  width: 29.5rem;
  overflow: hidden;

  color: ${({ theme, customColor = "white" }) =>
    theme.colors[customColor as keyof typeof theme.colors]};
  ${({ theme, customFont = "body1-normal-medi" }) =>
    theme.fonts[customFont as keyof typeof theme.fonts]};
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const BoxDivider = styled.div<BoxDividerStyle>`
  width: ${({ width = "29.5rem" }) => width};
  margin: 0.2rem 0;

  color: ${({ theme }) => theme.colors.gray_500};

  border-top: 0.1rem solid;
`;
