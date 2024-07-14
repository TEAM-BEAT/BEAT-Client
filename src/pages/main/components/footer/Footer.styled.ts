import styled from "styled-components";
import { IconFooterLogo } from "@assets/svgs";

export const FooterWrapper = styled.section`
  width: 100%;
  height: 19rem;

  background-color: ${({ theme }) => theme.colors.gray_800};
`;

export const FooterTop = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: auto;
`;

export const Logo = styled(IconFooterLogo)`
  width: 5.7rem;
  height: 2.4rem;
  margin: 2rem 0 0 2.4rem;
`;

export const InfoLayout = styled.section`
  display: flex;
  align-items: center;
  width: auto;
  padding: 0 1.6rem;
`;

export const InfoBtn = styled.button`
  padding: 0.8rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts["caption1-semi"]};
`;

export const BtnDivider = styled.div`
  height: 1rem;
  margin: 0.2rem 0;

  color: ${({ theme }) => theme.colors.gray_500};

  border-left: 0.1rem solid;
`;

export const FooterBottom = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: flex-start;
  padding: 0.8rem 2.4rem 2.4rem;
`;

export const FooterInfo = styled.div`
  color: ${({ theme }) => theme.colors.gray_500};
  ${({ theme }) => theme.fonts["caption2-medi"]};
`;
