import useHamburger from "@hooks/useHamburger";
import { hamburgerAtom } from "@stores/hamburger";
import { useAtomValue } from "jotai";
import { useRef } from "react";
import * as S from "./Hamburger.styled";

const Hamburger = () => {
  const hamburger = useAtomValue(hamburgerAtom);
  const { isOpen } = hamburger;

  const { closeHamburger } = useHamburger();
  const outside = useRef<HTMLDivElement>(null);

  const handlerOutside = (e: any) => {
    closeHamburger();
    e.stopPropagation();
  };

  return (
    <>
      <S.Overlay onClick={handlerOutside} />
      <S.HamburgerWrapper
        ref={outside}
        className={isOpen ? "open" : ""}
        onClick={(e) => e.preventDefault()}
      />
    </>
  );
};

export default Hamburger;
