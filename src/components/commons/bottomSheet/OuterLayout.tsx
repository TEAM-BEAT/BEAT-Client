import * as S from "./OuterLayout.styled";
import React, { ReactNode } from "react";
import { OuterLayoutStyle } from "./OuterLayout.styled";

interface OuterLayoutProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, OuterLayoutStyle {
  children?: ReactNode;
}

const OuterLayout = ({ children, ...rest }: OuterLayoutProps) => {
  return <S.OuterLayoutWrapper {...rest}>{children}</S.OuterLayoutWrapper>;
};

export default OuterLayout;
