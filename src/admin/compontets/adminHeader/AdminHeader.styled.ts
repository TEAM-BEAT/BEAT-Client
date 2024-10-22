import styled from "styled-components";
import { IconFooterLogo, IconProfile } from "@assets/svgs";

export const AdminHeaderWrapper = styled.section`
  display: flex;
  gap: 123.4rem;
  align-items: flex-start;
  justify-content: center;
  width: 144rem;
  height: 6rem;
  padding: 1.4rem 4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
  border-bottom: 0.1rem solid;
  border-bottom-color: ${({ theme }) => theme.colors.gray_700};
`;

export const LogoIcon = styled(IconFooterLogo)`
  width: 9.4rem;
  height: 3.2rem;
`;

export const ProfileIcon = styled(IconProfile)`
  width: 3.2rem;
  height: 3.2rem;
`;
