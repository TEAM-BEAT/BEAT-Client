import React, { HTMLAttributes } from "react";
import * as S from "./Toast.styled";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  isVisible: boolean;
  toastBottom?: number;
}

const Toast = ({ icon, children, isVisible, toastBottom = 3, ...rest }: ToastProps) => {
  return (
    <S.ToastWrapper $isVisible={isVisible} $toastBottom={toastBottom} {...rest}>
      {icon && <S.ToastIcon>{icon}</S.ToastIcon>}
      <S.ToastMessage>{children}</S.ToastMessage>
    </S.ToastWrapper>
  );
};

export default Toast;
