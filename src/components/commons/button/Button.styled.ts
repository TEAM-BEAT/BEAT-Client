import { Generators } from "@styles/generator";
import styled, { css } from "styled-components";
import { ButtonSizeTypes, ButtonVariantTypes } from "./Button";

interface DefaultBtnPropTypes {
  $size: ButtonSizeTypes;
  $variant: ButtonVariantTypes;
  $isDisabled?: boolean;
}

const width = {
  xlarge: "32.7rem",
  large: "27.9rem",
  medium: "15.8rem",
  small: "13.6rem",
  xsmall: "10.3rem",
};

const height = {
  xlarge: "5.6rem",
  large: "4.6rem",
  medium: "4.6rem",
  small: "4.6rem",
  xsmall: "3.6rem",
};

export const DefaultBtn = styled.button<DefaultBtnPropTypes>`
  ${Generators.flexGenerator("row", "center", "center")};
  ${({ $size }) => {
    if (typeof $size === "string") {
      switch ($size) {
        case "xlarge":
          return css`
            width: 32.7rem;
            height: 5.6rem;
            ${({ theme }) => theme.fonts["body1-normal-semi"]};
          `;
        case "large":
          return css`
            width: 27.9rem;
            height: 4.6rem;
            ${({ theme }) => theme.fonts["body2-normal-semi"]};
          `;
        case "medium":
          return css`
            width: 15.8rem;
            height: 4.6rem;
            ${({ theme }) => theme.fonts["body2-normal-semi"]};
          `;
        case "small":
          return css`
            width: 13.6rem;
            height: 4.6rem;
            ${({ theme }) => theme.fonts["body2-normal-semi"]};
          `;
        case "xsmall":
          return css`
            width: 10.3rem;
            height: 3.6rem;
            ${({ theme }) => theme.fonts["caption1-semi"]};
          `;
        default:
          return css;
      }
    } else if (typeof $size === "object") {
      return css`
        width: ${$size.width};
        height: ${$size.height};
        ${({ theme }) => theme.fonts["caption1-semi"]};
      `;
    }
  }}
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "cursor")};
  border-radius: 6px;

  ${({ $variant, $isDisabled }) => {
    switch ($variant) {
      case "primary":
        return $isDisabled
          ? css`
              color: ${({ theme }) => theme.colors.pink_700};

              background-color: ${({ theme }) => theme.colors.pink_900};
            `
          : css`
              color: ${({ theme }) => theme.colors.white};

              background-color: ${({ theme }) => theme.colors.pink_400};
            `;
      case "line":
        return $isDisabled
          ? css`
              color: ${({ theme }) => theme.colors.pink_800};

              background-color: ${({ theme }) => theme.colors.gray_900};
              border: 1px solid ${({ theme }) => theme.colors.pink_800};
            `
          : css`
              color: ${({ theme }) => theme.colors.pink_400};

              background-color: ${({ theme }) => theme.colors.gray_900};
              border: 1px solid ${({ theme }) => theme.colors.pink_400};
            `;
      case "gray":
        return $isDisabled
          ? css`
              color: ${({ theme }) => theme.colors.gray_600};

              background-color: ${({ theme }) => theme.colors.gray_700};
            `
          : css`
              color: ${({ theme }) => theme.colors.white};

              background-color: ${({ theme }) => theme.colors.gray_700};
            `;
      case "blue":
        return css`
          color: ${({ theme }) => theme.colors.white};

          background-color: ${({ theme }) => theme.colors.blue_400};
        `;
    }
  }}
`;
