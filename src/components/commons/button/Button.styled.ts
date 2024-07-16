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
    switch ($size) {
      case "xlarge":
        return css`
          ${({ theme }) => theme.fonts["body1-normal-semi"]};
        `;
      case "large":
        return css`
          ${({ theme }) => theme.fonts["body2-normal-semi"]};
        `;
      case "medium":
        return css`
          ${({ theme }) => theme.fonts["body2-normal-semi"]};
        `;
      case "small":
        return css`
          ${({ theme }) => theme.fonts["body2-normal-semi"]};
        `;
      case "xsmall":
        return css`
          ${({ theme }) => theme.fonts["caption1-semi"]};
        `;
    }
  }};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "cursor")};
  border-radius: 6px;
  ${({ $size }) =>
    $size &&
    css`
      width: ${width[$size]};
      height: ${height[$size]};
    `};

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
