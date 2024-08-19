import { ButtonDelete24, IconArrowRight, IconProfile } from "@assets/svgs";
import styled, { css, keyframes } from "styled-components";

interface HamburgerWrapperProps {
  $isOpen: boolean;
  width: number;
}

const hamburgerAnimation = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
  }
  100%{
    transform: translateX(0);
    opacity: 1;
    visibility: visible;

  }
`;

export const HamburgerWrapper = styled.section<HamburgerWrapperProps>`
  position: absolute;
  top: 0;
  left: ${({ width }) => `${width / 2 - 68}px`};
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 25.6rem;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.gray_900};
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};

  animation: ${({ $isOpen }) =>
      $isOpen &&
      css`
        ${hamburgerAnimation}
      `}
    0.2s ease-in-out;
`;

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 70%);
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};

  transition:
    opacity 200ms ease-in-out,
    visibility 200ms ease-in-out;
`;

export const CloseBtn = styled.section`
  z-index: 6;
  align-self: flex-end;
  width: 2.4rem;
  height: 2.4rem;
  margin: 2.4rem 2.4rem 0 0;
`;

export const CloseIcon = styled(ButtonDelete24)`
  width: 2.4rem;
  height: 2.4rem;
`;

export const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.6rem 0;
`;

export const ProfileIcon = styled(IconProfile)`
  width: 4rem;
  height: 4rem;
`;

export const LoginBtn = styled.button`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body2-normal-semi"]};

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.white};
`;

export const UserName = styled.div`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body2-normal-semi"]};
`;

export const NavigateBtnWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const NavigateBtn = styled.button`
  display: flex;
  gap: 2rem;
  width: 100%;
  padding: 1.2rem 2.4rem;
`;

export const NavigateBtnText = styled.div`
  width: 16.4rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["body1-normal-medi"]};
  text-align: left;
`;

export const ArrowRightIcon = styled(IconArrowRight)`
  width: 2.4rem;
  height: 2.4rem;

  color: ${({ theme }) => theme.colors.white};
`;

export const LogoutBtn = styled.button`
  position: absolute;
  right: 9.1rem;
  bottom: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;

  color: ${({ theme }) => theme.colors.gray_100};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};

  &::after {
    position: absolute;
    bottom: 1.2rem;
    left: 1.1rem;
    width: 4.9rem;
    height: 0.1rem;

    background-color: ${({ theme }) => theme.colors.gray_100};

    content: "";
  }
`;
