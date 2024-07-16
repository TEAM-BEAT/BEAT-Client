import { IcHamburgar, IconFooterLogo } from "@assets/svgs";
import styled from "styled-components";

export const MainNavigationWrapper = styled.section`
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 37.5rem;
  height: 5.6rem;

  color: white;
`;

export const LogoBtn = styled.button`
  width: 6rem;
  height: 2rem;
`;

export const LogoIcon = styled(IconFooterLogo)`
  width: 6rem;
  height: 2rem;
  margin-left: 2.4rem;
`;

export const HamburgarBtn = styled.button`
  z-index: 2;
  width: 3.2rem;
  height: 3.2rem;
  margin-right: 1.7rem;
`;

export const HamburgarIcon = styled(IcHamburgar)`
  width: 3.2rem;
  height: 3.2rem;
`;
