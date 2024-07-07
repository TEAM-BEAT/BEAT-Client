import useModal from "@hooks/useModal";
import { confirmAtom } from "@stores/modal";
import { useAtomValue } from "jotai";
import Button from "../chip/button/Button";
import ModalTextBox from "./components/ModalTextBox";
import ModalWrapper from "./components/ModalWrapper";
import * as S from "./components/ModalWrapper.styled";

const Confirm = () => {
  const confirm = useAtomValue(confirmAtom);
  const { isOpen, title, subTitle, okText, okCallback, noText, noCallback } = confirm;

  const { closeConfirm } = useModal();

  const handleOk = () => {
    okCallback?.();
    closeConfirm();
  };

  const handleNo = () => {
    noCallback?.();
    closeConfirm();
  };

  if (isOpen) {
    return (
      <ModalWrapper>
        <ModalTextBox title={title} subTitle={subTitle} />

        <S.ButtonWrapper>
          <Button size="small" variant="gray" onClick={handleNo}>
            {noText ?? "취소"}
          </Button>
          <Button size="small" variant="primary" onClick={handleOk}>
            {okText ?? "확인"}
          </Button>
        </S.ButtonWrapper>
      </ModalWrapper>
    );
  }

  return <></>;
};

export default Confirm;
