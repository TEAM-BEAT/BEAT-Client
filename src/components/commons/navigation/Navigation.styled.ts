import { IcHamburgar, IconArrowLeft, IconArrowRight, IconLogo } from "@assets/svgs";
import styled from "styled-components";

export const NavigationWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 37.5rem;
  padding: 1.2rem 1.6rem;
`;

export const Logo = styled(IconLogo)`
  width: 7.1rem;
  height: 2.5rem;

  cursor: pointer;
`;

export const NavigationTitle = styled.h1`
  ${({ theme }) => theme.fonts["body1-normal-semi"]};
  color: ${({ theme }) => theme.colors.white};
`;

export const HamburgarButton = styled(IcHamburgar)`
  width: 3.2rem;
  height: 3.2rem;

  cursor: pointer;
`;

export const NavigationLeftButton = styled(IconArrowLeft)`
  width: 2.4rem;
  height: 2.4rem;

  cursor: pointer;
`;

export const NavigationRightButton = styled(IconArrowRight)`
  width: 2.4rem;
  height: 2.4rem;

  cursor: pointer;
`;

export const SubTextButton = styled.button`
  ${({ theme }) => theme.fonts["body1-normal-semi"]};
  color: ${({ theme }) => theme.colors.pink_400};
`;
