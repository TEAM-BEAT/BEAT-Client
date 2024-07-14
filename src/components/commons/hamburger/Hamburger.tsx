import { useRef, useEffect } from "react";
import * as S from "./Hamburger.styled";
import { useAtomValue } from "jotai";
import { hamburgerAtom } from "@stores/hamburger";
import useHamburger from "@hooks/useHamburger";

const Hamburger = () => {
  const hamburger = useAtomValue(hamburgerAtom);
  const { isOpen } = hamburger;

  const { closeHamburger } = useHamburger();
  const outside = useRef<any>();

  useEffect(() => {
    document.addEventListener("mousedown", handlerOutside);
    return () => {
      document.removeEventListener("mousedown", handlerOutside);
    };
  });

  const handlerOutside = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    closeHamburger();
  };

  return <S.HamburgerWrapper ref={outside} className={isOpen ? "open" : ""}></S.HamburgerWrapper>;
};

export default Hamburger;
