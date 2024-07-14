import { alertAtom, confirmAtom, modalAtom } from "@stores/modal";
import { AlertProps, ConfirmProps, ModalProps } from "@typings/modalType";
import { useAtom } from "jotai";

const useModal = () => {
  const [alert, setAlert] = useAtom(alertAtom);
  const [confirm, setConfirm] = useAtom(confirmAtom);
  const [modal, setModal] = useAtom(modalAtom);

  const openAlert = (alertProps: Omit<AlertProps, "isOpen">) => {
    setAlert({
      isOpen: true,
      ...alertProps,
    });
  };

  const closeAlert = () => {
    setAlert({
      isOpen: false,
      title: "",
      subTitle: "",
      okText: "",
      okCallback: () => {},
    });
  };

  const openConfirm = (confirmProps: Omit<ConfirmProps, "isOpen">) => {
    setConfirm({
      isOpen: true,
      ...confirmProps,
    });
  };

  const closeConfirm = () => {
    setConfirm({
      isOpen: false,
      title: "",
      subTitle: "",
      okText: "",
      okCallback: () => {},
      noText: "",
      noCallback: () => {},
    });
  };

  const openModal = (modalProps: Omit<ModalProps, "isOpen">) => {
    setModal({
      isOpen: true,
      ...modalProps,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
    });
  };

  return {
    openAlert,
    closeAlert,
    alert,
    openConfirm,
    closeConfirm,
    confirm,
    openModal,
    closeModal,
    modal,
  };
};

export default useModal;
