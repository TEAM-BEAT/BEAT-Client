import useModal from "@hooks/useModal";
import React, { useRef } from "react";
import * as S from "./ModalWrapper.styled";

interface ModalWrapperProps {
  children: React.ReactNode;
  type: "alert" | "confirm" | "modal";
}

const ModalWrapper = ({ children, type }: ModalWrapperProps) => {
  const { closeAlert, closeConfirm } = useModal();
  const containerRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    switch (type) {
      case "alert":
        closeAlert();
        return;
      case "confirm":
        closeConfirm();
        return;
      default:
        return;
    }
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  return (
    <S.ModalWrapper onClick={handleClickOutside}>
      <S.ModalContainer ref={containerRef}>{children}</S.ModalContainer>
    </S.ModalWrapper>
  );
};

export default ModalWrapper;
