import styled from "styled-components";

export const HamburgerWrapper = styled.section`
  position: absolute;
  top: 0;
  right: -25.6rem;
  z-index: 5;
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
