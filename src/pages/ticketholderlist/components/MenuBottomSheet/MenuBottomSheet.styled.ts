import styled from "styled-components";

export const MenuBottomSheetWrapper = styled.section<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  z-index: 30;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  background-color: rgb(0 0 0 / 50%);
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};

  transition:
    opacity 250ms ease-in-out,
    visibility 250ms ease-in-out;
`;
