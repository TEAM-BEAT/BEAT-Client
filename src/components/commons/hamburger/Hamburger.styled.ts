import styled from "styled-components";

export const HamburgerWrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const HamburgerContainer = styled.section`
  position: absolute;
  top: 0;
  right: -25.6rem;
  z-index: 10;
  width: 25.6rem;
  height: 1500%;

  background-color: ${({ theme }) => theme.colors.gray_900};
  visibility: hidden;

  transition: 0.5s ease;

  &.open {
    right: 0;

    visibility: visible;

    transition: 0.5s ease;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
`;
