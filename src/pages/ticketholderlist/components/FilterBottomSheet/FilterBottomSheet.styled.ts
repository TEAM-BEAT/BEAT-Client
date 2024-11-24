import styled from "styled-components";
import { IcRefresh, IconCheckboxSelectedOn, IconCheckboxUnselectedOn } from "@assets/svgs";

export const FilterBottomSheetWrapper = styled.section<{ $isOpen: boolean }>`
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

export const TitleWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;

  ${({ theme }) => theme.fonts.heading4};
  color: ${({ theme }) => theme.colors.white};
`;

export const RefreshBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;

  background-color: ${({ theme }) => theme.colors.gray_700};
  border-radius: 50%;
`;

export const RefreshIcon = styled(IcRefresh)`
  display: flex;
  width: 2.1rem;
  height: 2.1rem;
`;

export const BoxDivider = styled.div`
  display: flex;
  width: 32.7rem;
  margin: 2rem 0;

  color: ${({ theme }) => theme.colors.gray_700};

  border-top: 0.1rem solid;
`;

export const CheckBoxContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const CheckBoxRow = styled.section`
  display: flex;
  gap: 8.1rem;
`;

export const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  width: 9rem;
`;

export const CheckBox = styled.input`
  display: none;
`;

export const SelectIcon = styled(IconCheckboxSelectedOn)`
  width: 2rem;
  height: 2rem;
  margin-right: 0.8rem;
`;

export const UnSelectIcon = styled(IconCheckboxUnselectedOn)`
  width: 2rem;
  height: 2rem;
  margin-right: 0.8rem;
`;

export const CheckBoxText = styled.div`
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts["body1-normal-medi"]};
`;
