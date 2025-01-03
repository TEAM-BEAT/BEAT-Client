import React, { HTMLAttributes } from "react";
import * as S from "./Toast.styled";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  isVisible: boolean;
  toastBottom?: number;
  isTop?: boolean;
}

const Toast = ({
  icon,
  children,
  isVisible,
  toastBottom = 3,
  isTop = false,
  ...rest
}: ToastProps) => {
  return (
    <S.ToastWrapper $isVisible={isVisible} $toastBottom={toastBottom} $isTop={isTop} {...rest}>
      {icon && <S.ToastIcon>{icon}</S.ToastIcon>}
      <S.ToastMessage>{children}</S.ToastMessage>
    </S.ToastWrapper>
  );
};

export default Toast;
