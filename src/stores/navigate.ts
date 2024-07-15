import { atomWithStorage } from "jotai/utils";

export const navigateAtom = atomWithStorage<string>("navigateUrl", "");
