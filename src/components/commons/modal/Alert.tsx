import { alertAtom } from "@stores/modal";
import { useAtom } from "jotai";
import ModalTextBox from "./components/ModalTextBox";
import ModalWrapper from "./components/ModalWrapper";

const Alert = () => {
  const [alert, setAlert] = useAtom(alertAtom);
  const { isOpen, title, subTitle, okText, okCallback } = alert;

  const handleOk = () => {
    okCallback?.();
    setAlert({
      isOpen: false,
      title: "",
      subTitle: "",
      okText: "",
      okCallback: () => {},
    });
  };

  if (isOpen) {
    return (
      <ModalWrapper>
        <ModalTextBox title={title} subTitle={subTitle} />
        {/* TODO: 공통 버튼 컴포넌트로 변경 */}
        <button onClick={handleOk}>{okText ?? "확인"}</button>
      </ModalWrapper>
    );
  }

  return <></>;
};

export default Alert;
