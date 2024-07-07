import { AlertProps, ConfirmProps } from "@typings/modalType";
import { atom } from "jotai";

export const alertAtom = atom<AlertProps>({ isOpen: false, title: "" });

export const confirmAtom = atom<ConfirmProps>({
  isOpen: false,
  title: "",
});
