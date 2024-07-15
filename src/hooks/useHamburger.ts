import { hamburgerAtom } from "@stores/hamburger";
import { useAtom } from "jotai";

const useHamburger = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useAtom(hamburgerAtom);

  const openHamburger = () => {
    setIsHamburgerOpen({ isOpen: true });
  };

  const closeHamburger = () => {
    setIsHamburgerOpen({ isOpen: false });
  };

  return { isHamburgerOpen, openHamburger, closeHamburger };
};

export default useHamburger;
