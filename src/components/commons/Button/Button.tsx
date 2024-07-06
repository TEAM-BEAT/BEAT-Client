import React, { ReactNode } from "react";
import * as S from "./Button.styled";

export interface ButtonPropTypes {
  size: "xlarge" | "large" | "medium" | "small" | "xsmall";
  isDisabled?: boolean;
  varient: "primary" | "line" | "gray" | "blue";
  children: ReactNode; //자식 노드(텍스트)를 받기 위해 필수.
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; //MouseEvent와는 상이
}

const Button = ({ onClick, size, isDisabled, varient, children }: ButtonPropTypes) => {
  return (
    <>
      {varient === "primary" && (
        <S.PrimaryButton
          onClick={isDisabled ? undefined : onClick}
          size={size}
          isDisabled={isDisabled}
        >
          {children}
        </S.PrimaryButton>
      )}
      {varient === "line" && (
        <S.LineButton
          onClick={isDisabled ? undefined : onClick}
          size={size}
          isDisabled={isDisabled}
        >
          {children}
        </S.LineButton>
      )}
      {varient === "gray" && (
        <S.GrayButton
          onClick={isDisabled ? undefined : onClick}
          size={size}
          isDisabled={isDisabled}
        >
          {children}
        </S.GrayButton>
      )}
      {varient === "blue" && (
        <S.BlueButton
          onClick={isDisabled ? undefined : onClick}
          size={size}
          isDisabled={isDisabled}
        >
          {children}
        </S.BlueButton>
      )}
    </>
  );
};

export default Button;
