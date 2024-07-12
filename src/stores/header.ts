import { NAVIGATION_STATE } from "@constants/navigationState";
import { HeaderProps } from "@typings/headerType";
import { atom } from "jotai";

export const headerAtom = atom<HeaderProps>({ headerStyle: NAVIGATION_STATE.ICON_TITLE_SUB_TEXT });
