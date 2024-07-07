import useModal from "@hooks/useModal";
import { confirmAtom } from "@stores/modal";
import { useAtomValue } from "jotai";
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

        {/* TODO: 공통 버튼 컴포넌트로 변경 */}
        <S.ButtonWrapper>
          <button onClick={handleNo}>{noText ?? "취소"}</button>
          <button onClick={handleOk}>{okText ?? "확인"}</button>
        </S.ButtonWrapper>
      </ModalWrapper>
    );
  }

  return <></>;
};

export default Confirm;
