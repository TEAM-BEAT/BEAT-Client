import Spacing from "@components/commons/spacing/Spacing";
import React, { ReactNode } from "react";
import * as S from "./Bank.styled";

export interface InputAccountWrapperProps {
  label?: string;
  children?: ReactNode;
}

const InputWrapper = ({ label, children }: InputAccountWrapperProps) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <S.InputAccountWrapper>
      <S.InputAccountLabel>{label || "공연료 입금 계좌번호"}</S.InputAccountLabel>
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
