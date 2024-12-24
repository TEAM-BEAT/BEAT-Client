import { Generators } from "@styles/generator";
import styled, { css, keyframes } from "styled-components";

const toastAnimation = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  20% {
    transform: translateY(0);
    opacity: 1;
  }
  80% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const toastShow = css(["", " 2s forwards;"] as any as TemplateStringsArray, toastAnimation);

interface ToastWrapperProps {
  $isVisible: boolean;
  $toastBottom: number;
  $isTop?: boolean;
}

export const ToastWrapper = styled.div<ToastWrapperProps>`
  ${Generators.flexGenerator()}
  position: fixed;

  ${({ $isTop, $toastBottom }) => ($isTop ? " top: 0.8rem;" : `bottom: ${$toastBottom * 0.1}rem;`)};

  z-index: 999;
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  gap: 0.8rem;
  min-width: 19.2rem;
  height: 4rem;
  margin: 0 2rem;
  padding: 0 3.2rem 0 1.6rem;

  background-color: ${({ theme, $isTop }) =>
    $isTop ? theme.colors.gray_800 : theme.colors.gray_900};
  border-radius: 6px;

  animation: ${({ $isVisible }) => $isVisible && toastShow};
`;

export const ToastIcon = styled.span`
  width: 2.2rem;
  height: 2.2rem;
`;

export const ToastMessage = styled.div`
  color: ${(props) => props.theme.colors.white};
  ${({ theme }) => theme.fonts["caption2-semi"]};
`;
