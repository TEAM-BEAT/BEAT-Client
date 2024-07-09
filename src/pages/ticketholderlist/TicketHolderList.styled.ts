import { IconToggleOff, IconToggleOn } from "@assets/svgs";
import styled from "styled-components";

export const BodyWrapper = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 37.4rem;
  height: auto;
  min-height: 60.8rem; /* 60.8rem(body의 높이) +  5.6rem(헤더의 높이) */
  padding: 2.4rem;
`;

export const BodyLayout = styled.section`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  gap: 2.4rem;
  align-items: flex-start;
`;

export const LayoutHeaderBox = styled.div`
  display: flex;
  gap: 3.2rem;
  align-items: flex-end;
  align-self: stretch;
`;

export const LayoutFilterBox = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

export const ToggleText = styled.span`
  color: ${({ theme }) => theme.colors.gray_400};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const ToggleOnIcon = styled(IconToggleOn)<{ $width: string; $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;

export const ToggleOffIcon = styled(IconToggleOff)<{ $width: string; $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;

export const FooterButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1;
`;
