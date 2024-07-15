import styled from "styled-components";
import { ButtonDelete24, IconProfile, IconArrowRight } from "@assets/svgs";

export const HamburgerWrapper = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 25.6rem;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.gray_900};
  transform: translateX(100%);
  visibility: hidden;

  transition: 0.5s ease;

  &.open {
    right: 0;

    transform: translateX(0);
    visibility: visible;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
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
