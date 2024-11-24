import styled, { keyframes } from "styled-components";

const bottomSheetUp = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
`;

const bottomSheetDown = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
`;

export const BottomSheetWrapper = styled.section<{ $isOpen: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  width: 100%;

  animation: ${({ $isOpen }) => ($isOpen ? bottomSheetUp : bottomSheetDown)} 250ms ease-in-out;
`;

export const BottomSheetLayout = styled.section<{ $paddingTop?: string }>`
  width: 37.5rem;
  padding: ${({ $paddingTop }) =>
    $paddingTop ? `${$paddingTop} 2.4rem 2.8rem` : "3.6rem 2.4rem 2.8rem"};

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 2rem 2rem 0 0;
`;
