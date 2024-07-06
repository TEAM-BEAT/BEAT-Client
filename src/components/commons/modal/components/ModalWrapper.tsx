import React from "react";
import * as S from "./ModalWrapper.styled";

interface ModalWrapperProps {
  children: React.ReactNode;
}

const ModalWrapper = (props: ModalWrapperProps) => {
  const { children } = props;

  return (
    <S.ModalWrapper>
      <S.ModalContainer>{children}</S.ModalContainer>
    </S.ModalWrapper>
  );
};

export default ModalWrapper;
