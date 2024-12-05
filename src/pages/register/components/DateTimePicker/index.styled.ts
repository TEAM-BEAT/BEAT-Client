import { IconCalendar } from "@assets/svgs";
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;

  background: rgb(0 0 0 / 50%);
`;

export const Wrapper = styled.div`
  width: 327px;
`;

export const InputContainer = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 13px 12px 16px;

  background-color: ${({ theme }) => theme.colors.gray_800};
  cursor: pointer;
  border: 1px solid ${({ theme, $open }) => ($open ? theme.colors.gray_0 : theme.colors.gray_800)};
  border-radius: 8px;
`;

export const Text = styled.p<{ $highlight: boolean }>`
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  color: ${({ theme, $highlight }) => ($highlight ? theme.colors.gray_0 : theme.colors.gray_600)};
`;

export const CustomOpenPicker = styled(IconCalendar)<{ $open: boolean }>`
  width: 2.4rem;

  fill: ${({ $open, theme }) => ($open ? theme.colors.gray_0 : theme.colors.gray_600)};
`;

export const PickerContainer = styled.div`
  position: absolute;
  top: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  padding: 20px;

  background: ${({ theme }) => theme.colors.gray_800};
  border-radius: 6px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;
