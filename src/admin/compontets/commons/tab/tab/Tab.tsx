import React, { ReactNode } from "react";
import * as S from "./Tab.styled";

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Tab = ({ onClick, selected, children }: TabProps) => {
  return (
    <S.TabWrapper onClick={onClick} $isSelected={selected}>
      <S.TabText>{children}</S.TabText>
      <S.TabBar $isSelected={selected} />
    </S.TabWrapper>
  );
};

export default Tab;
