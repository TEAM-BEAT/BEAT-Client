import { modalAtom } from "@stores/modal";
import { useAtomValue } from "jotai";
import ModalWrapper from "./components/ModalWrapper";

const Modal = () => {
  const modal = useAtomValue(modalAtom);
  const { isOpen, children } = modal;

  if (isOpen) {
    return <ModalWrapper>{children}</ModalWrapper>;
  }

  return <></>;
};

export default Modal;
