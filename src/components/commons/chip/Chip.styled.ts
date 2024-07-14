import styled from "styled-components";
import { ChipsColorTypes } from "./Chip";

export const ChipWrapper = styled.div<{ color?: ChipsColorTypes }>`
  display: inline-flex;
  gap: 0.6rem;
  align-items: center;
  padding: 0.9rem 1.2rem;

  cursor: pointer;
  border-radius: 2rem;

  ${({ theme }) => theme.fonts["body2-normal-medi"]};

  ${({ theme, color }) => {
    switch (color) {
      case "pink":
        return `
          background-color: ${theme.colors.pink_400};
          color: ${theme.colors.gray_0};
        `;
      case "white":
        return `
          background-color: ${theme.colors.gray_0};
          color:  ${theme.colors.gray_900};
        `;
      case "gray":
        return `
          background-color: ${theme.colors.gray_800};
          color: ${theme.colors.gray_500}; 
        `;
      default:
        return `
          background-color: ${theme.colors.gray_0};
          color:  ${theme.colors.pink_400};
        `;
    }
  }}
`;

export const ChipIcon = styled.span<{ iconColor?: string }>`
  width: 1.6rem;
  height: 1.6rem;

  ${({ theme, iconColor }) => {
    switch (iconColor) {
      case "pink":
        return `
          color: ${theme.colors.pink_400};
        `;
      case "white":
        return `
          color:  ${theme.colors.white};
        `;
      case "gray":
        return `
          color: ${theme.colors.gray_500}; 
        `;
      default:
        return `
          color:  ${theme.colors.gray_500};
        `;
    }
  }}
`;
