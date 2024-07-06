import { ReactNode } from "react";
import * as S from "./Button.styled";

export interface ButtonPropTypes {
  size: "xlarge" | "large" | "medium" | "small" | "xsmall";
  isDisabled?: boolean;
  varient: "primary" | "line" | "gray" | "blue";
  children: ReactNode;
}

const Button = ({ size, isDisabled, varient, children }: ButtonPropTypes) => {
  return (
    <>
      {varient === "primary" && (
        <S.PrimaryButton size={size} isDisabled={isDisabled}>
          {children}
        </S.PrimaryButton>
      )}
      {varient === "line" && (
        <S.LineButton size={size} isDisabled={isDisabled}>
          {children}
        </S.LineButton>
      )}
      {varient === "gray" && (
        <S.GrayButton size={size} isDisabled={isDisabled}>
          {children}
        </S.GrayButton>
      )}
      {varient === "blue" && (
        <S.BlueButton size={size} isDisabled={isDisabled}>
          {children}
        </S.BlueButton>
      )}
    </>
  );
};

export default Button;
