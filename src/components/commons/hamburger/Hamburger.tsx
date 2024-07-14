import { useRef } from "react";
import * as S from "./Hamburger.styled";
import { useAtomValue } from "jotai";
import { hamburgerAtom } from "@stores/hamburger";
import useHamburger from "@hooks/useHamburger";

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
      {isOpen && (
        <S.HamburgerWrapper>
          <S.Overlay onClick={handlerOutside} />
          <S.HamburgerContainer
            ref={outside}
            className={isOpen ? "open" : ""}
            onClick={(e) => e.preventDefault()}
          />
        </S.HamburgerWrapper>
      )}
    </>
  );
};

export default Hamburger;
