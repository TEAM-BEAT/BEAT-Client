import styled from "styled-components";

import { BoxDividerStyle, BoxTitleStyle } from "@typings/contextBoxProps";

export const ViewBottomSheetWrapper = styled.section<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  z-index: 30;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 50%);
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};

  transition:
    opacity 250ms ease-in-out,
    visibility 250ms ease-in-out;
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
