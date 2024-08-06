import { useModal } from "@hooks";
import { alertAtom } from "@stores";
import { useAtomValue } from "jotai";
import React from "react";
import Button from "../button/Button";
import ModalTextBox from "./components/ModalTextBox";
import ModalWrapper from "./components/ModalWrapper";

const Alert = () => {
  const alert = useAtomValue(alertAtom);
  const { isOpen, title, subTitle, okText, okCallback } = alert;

  const { closeAlert } = useModal();

  const handleOk = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    okCallback?.();
    closeAlert();
  };

  if (isOpen) {
    return (
      <ModalWrapper>
        <ModalTextBox title={title} subTitle={subTitle} />

        <Button size="large" variant="primary" onClick={handleOk}>
          {okText ?? "확인"}
        </Button>
      </ModalWrapper>
    );
  }

  return <></>;
};

export default Alert;
