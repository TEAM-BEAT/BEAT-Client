import { Generators } from "@styles/generator";
import styled, { css, keyframes } from "styled-components";

const toastShow = keyframes`
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

const toastAni = css(["", " 2s forwards;"] as any as TemplateStringsArray, toastShow);

interface ToastWrapperProps {
  $isVisible: boolean;
  $toastBottom: number;
}

export const ToastWrapper = styled.div<ToastWrapperProps>`
  ${Generators.flexGenerator()}
  position: fixed;
  bottom: ${({ $toastBottom }) => $toastBottom}rem;
  z-index: 1;
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  gap: 0.8rem;
  min-width: 19.2rem;
  height: 4rem;
  margin: 0 2rem;
  padding: 0 3.2rem 0 1.6rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
  border-radius: 6px;

  animation: ${({ $isVisible }) => $isVisible && toastAni};
`;

export const ToastIcon = styled.span`
  width: 2.2rem;
  height: 2.2rem;
`;

export const ToastMessage = styled.div`
  color: ${(props) => props.theme.colors.white};
  ${({ theme }) => theme.fonts["caption2-semi"]};
`;
