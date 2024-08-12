import { BtnFloating, Union } from "@assets/svgs";
import styled, { keyframes } from "styled-components";

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const Layer = styled.section<{ $width: number }>`
  position: fixed;
  bottom: 15rem;
  left: ${({ $width }) => `${$width / 2 + 50}px`};
  z-index: 25;
`;

export const FloatingWrapper = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;

  animation: ${float} 2s ease-in-out infinite;
`;

export const FloatingContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const UnionIcon = styled(Union)`
  width: 10.3rem;
  height: 3rem;
  margin-right: 2rem;
`;

export const UnionText = styled.div`
  position: absolute;
  top: 0.55rem;
  left: 0.6rem;
  z-index: 30;
  display: flex;

  color: ${({ theme }) => theme.colors.pink_400};
  ${({ theme }) => theme.fonts["caption2-semi"]};
`;

export const FloatingBtnWrapper = styled.button`
  display: flex;
  width: 6.4rem;
  height: 6.4rem;
  margin-left: 5.4rem;
`;

export const FloatingBtn = styled(BtnFloating)`
  width: 6.4rem;
  height: 6.4rem;
`;
