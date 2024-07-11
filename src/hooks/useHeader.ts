import { headerAtom } from "@stores/header";
import { useAtom } from "jotai";

export const useHeader = () => {
  //여기서 header는 header 설정을 위해 필요한 속성들을 담은 객체.
  const [header, setHeader] = useAtom(headerAtom);

  return { header, setHeader };
};
