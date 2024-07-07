import styled, { css } from "styled-components";

interface DefaultBtnPropTypes {
  $size: "xlarge" | "large" | "medium" | "small" | "xsmall";
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

const DefaultBtn = styled.button<DefaultBtnPropTypes>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.fonts["body2-normal-semi"]};

  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "cursor")};
  border-radius: 6px;
  ${({ $size }) =>
    $size &&
    css`
      width: ${width[$size]};
      height: ${height[$size]};
    `};
`;

export const PrimaryButton = styled(DefaultBtn)`
  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          color: ${({ theme }) => theme.colors.pink_700};

          background-color: ${({ theme }) => theme.colors.pink_900};
        `
      : css`
          color: ${({ theme }) => theme.colors.white};

          background-color: ${({ theme }) => theme.colors.pink_400};
        `}
`;

export const LineButton = styled(DefaultBtn)`
  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          color: ${({ theme }) => theme.colors.pink_800};

          background-color: ${({ theme }) => theme.colors.gray_900};
          border: 1px solid ${({ theme }) => theme.colors.pink_800};
        `
      : css`
          color: ${({ theme }) => theme.colors.pink_400};

          background-color: ${({ theme }) => theme.colors.gray_900};
          border: 1px solid ${({ theme }) => theme.colors.pink_400};
        `}
`;

export const GrayButton = styled(DefaultBtn)`
  ${({ $isDisabled }) =>
    $isDisabled
      ? css`
          color: ${({ theme }) => theme.colors.gray_600};

          background-color: ${({ theme }) => theme.colors.gray_700};
        `
      : css`
          color: ${({ theme }) => theme.colors.white};

          background-color: ${({ theme }) => theme.colors.gray_700};
        `}
`;

export const BlueButton = styled(DefaultBtn)`
  width: 32.7rem;
  height: 5.6rem;

  color: ${({ theme }) => theme.colors.white};

  background-color: ${({ theme }) => theme.colors.blue_400};
`;
