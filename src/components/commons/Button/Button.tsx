import React, { ReactNode } from "react";
import * as S from "./Button.styled";

export type ButtonSizeTypes = "xlarge" | "large" | "medium" | "small" | "xsmall";
export type ButtonVariantTypes = "primary" | "line" | "gray" | "blue";

//React.ButtonHTMLAttributes는 버튼 속성에 집중하긴 했지만, 제네릭 타입이다.
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSizeTypes;
  variant: ButtonVariantTypes;
  children: ReactNode; //자식 노드(텍스트)를 받기 위해 필수.
  onClick?: React.MouseEventHandler<HTMLButtonElement>; //MouseEvent와는 상이
}

//disabled는 버튼의 기본 속성(따라서 위의 interface에서 명시되어 있지는 않다.)
const Button = ({ onClick, size, disabled, variant, children }: ButtonProps) => {
  return (
    <S.DefaultBtn onClick={onClick} $size={size} $isDisabled={disabled} $variant={variant}>
      {children}
    </S.DefaultBtn>
  );
};

export default Button;
