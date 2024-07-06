import { alertAtom, confirmAtom } from "@stores/modal";
import { AlertProps, ConfirmProps } from "@typings/modalType";
import { useAtom } from "jotai";

const useModal = () => {
  const [alert, setAlert] = useAtom(alertAtom);
  const [confirm, setConfirm] = useAtom(confirmAtom);

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
      okCallback: () => {},
      noCallback: () => {},
    });
  };

  return {
    openAlert,
    closeAlert,
    alert,
    openConfirm,
    closeConfirm,
    confirm,
  };
};

export default useModal;
