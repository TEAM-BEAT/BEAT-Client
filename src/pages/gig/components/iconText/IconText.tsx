import React from "react";
import * as S from "./IconText.styled";

interface IconTextProps {
  icon: React.ReactNode;
  text: string;
}

const IconText = ({ icon, text }: IconTextProps) => {
  return (
    <S.IconTextWrapper>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Text>{text}</S.Text>
    </S.IconTextWrapper>
  );
};

export default IconText;
