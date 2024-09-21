import React, { Children, ReactNode } from "react";
import * as S from "./LinkButton.styled";

export interface LinkButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const LinkButton = ({ children }: LinkButtonProps) => {
  const isLink = React.Children.count(children) > 0;
  return (
    <S.LinkButtonWrapper $isLink={isLink}>
      {!isLink ? "링크 연결하기" : children}
    </S.LinkButtonWrapper>
  );
};

export default LinkButton;
