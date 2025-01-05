import { IconTicket } from "@assets/svgs";
import styled, { css } from "styled-components";

export const Layer = styled.section<{ $width: number }>`
  position: fixed;
  bottom: 12rem;
  left: ${({ $width }) => `${$width / 2 + Math.min(375 / 2, $width / 2) - 24}px`};
  z-index: 25;
`;

export const FloatingBtnWrapper = styled.button<{ $showText: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: ${({ theme }) => theme.colors.pink_400};
  padding: 1rem;
  border-radius: 50px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 0px 26px 0px rgba(251, 36, 127, 0.6);
  transition: all 0.3s ease-in-out;

  position: absolute;
  right: 0;

  width: ${({ $showText }) => ($showText ? "12.7rem" : "5.2rem")};
`;

export const FloatingText = styled.p<{ $showText: boolean }>`
  ${({ theme }) => theme.fonts["body1-normal-semi"]};
  color: ${({ theme }) => theme.colors.white};
  white-space: nowrap;

  ${({ $showText }) =>
    $showText
      ? css`
          transform: translateX(0);
          transition:
            transform 0.3s ease-in-out,
            opacity 0.3s ease-in-out;
          opacity: 1;
        `
      : css`
          transform: translateX(50%);
          transition:
            transform 0.3s ease-in-out,
            opacity 0.3s ease-in-out;
          opacity: 0;
        `}
`;

export const TicketIcon = styled(IconTicket)`
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
`;
