import styled from "styled-components";

import { IcomCopy } from "@assets/svgs";

export const ActionBottomSheetWrapper = styled.section<{ $isOpen: boolean }>`
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

export const SubTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray_400};
  ${({ theme }) => theme.fonts["body1-normal-medi"]};
`;

export const PhoneNumLayout = styled.button`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
`;

export const PhoneNum = styled.section`
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts["body1-normal-medi"]};

  text-decoration-line: underline;
`;

export const Copy = styled(IcomCopy)`
  width: 2.4rem;
  height: 2.4rem;
`;
