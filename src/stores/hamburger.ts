import { HamburgerProps } from "@typings/hamburgerType";
import { atom } from "jotai";

export const hamburgerAtom = atom<HamburgerProps>({
  isOpen: false,
});
