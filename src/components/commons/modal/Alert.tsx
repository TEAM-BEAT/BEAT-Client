import useModal from "@hooks/useModal";
import { alertAtom } from "@stores/modal";
import { useAtomValue } from "jotai";
import Button from "../button/Button";
import ModalTextBox from "./components/ModalTextBox";
import ModalWrapper from "./components/ModalWrapper";

const Alert = () => {
  const alert = useAtomValue(alertAtom);
  const { isOpen, title, subTitle, okText, okCallback } = alert;

  const { closeAlert } = useModal();

  const handleOk = () => {
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
