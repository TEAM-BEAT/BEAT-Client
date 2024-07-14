import { hamburgerAtom } from "@stores/hamburger";
import { HamburgerProps } from "@typings/hamburgerType";
import { useAtom } from "jotai";

const useHamburger = () => {
  const [hamburger, setHamburger] = useAtom(hamburgerAtom);

  const openHamburger = () => {
    setHamburger({ isOpen: true });
  };

  const closeHamburger = () => {
    setHamburger({ isOpen: false });
  };

  return { hamburger, openHamburger, closeHamburger };
};

export default useHamburger;
