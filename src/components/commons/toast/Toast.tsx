import React, { HTMLAttributes } from "react";
import * as S from "./Toast.styled";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  isVisible: boolean;
  toastBottom?: number;
  isTop?: boolean;
}

//todo: 만약 모든 토스트 위에 위치하게 하고 싶다면, toastBottom 조정 필요
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
