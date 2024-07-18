import { UserProps } from "@typings/userType";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage<UserProps>("user", {
  nickname: "",
  accessToken: "",
});
