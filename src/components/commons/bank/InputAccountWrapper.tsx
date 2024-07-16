import React, { ReactNode } from "react";
import * as S from "./Bank.styled";
import Spacing from "@components/commons/spacing/Spacing";

export interface InputAccountWrapperProps {
  children?: ReactNode;
}

const InputWrapper = ({ children }: InputAccountWrapperProps) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <S.InputAccountWrapper>
      <S.InputAccountLabel>공연료 입금 계좌번호</S.InputAccountLabel>
      <Spacing marginBottom="2" />
      {childrenArray[0]}
      <Spacing marginBottom="1.2" />
      {childrenArray[1]}
      <Spacing marginBottom="1.2" />
      {childrenArray[2]}
      <Spacing marginBottom="1.6" />
    </S.InputAccountWrapper>
  );
};

export default InputWrapper;
