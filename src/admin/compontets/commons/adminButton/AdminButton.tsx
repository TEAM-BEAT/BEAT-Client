import React, { ReactNode } from "react";
import * as S from "./AdminButton.styled";

export type AdminButtonVariantTypes = "primary" | "brand" | "line" | "gray";

export interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AdminButtonVariantTypes;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const AdminButton = ({ onClick, variant, children }: AdminButtonProps) => {
  return (
    <S.AdminButton onClick={onClick} $variant={variant}>
      {children}
    </S.AdminButton>
  );
};

export default AdminButton;
