import styled from "styled-components";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { IconCalendar } from "@assets/svgs";

export const CustomPicker = styled(DesktopDateTimePicker)`
  & .MuiOutlinedInput-root {
    width: 32.7rem;
    height: 4.6rem;

    background: ${({ theme }) => theme.colors.gray_900};
    border: 1px solid ${({ theme }) => theme.colors.gray_700};
    border-radius: 6px;
  }

  & .MuiOutlinedInput-input {
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts["body2-normal-medi"]};
  }
`;

export const CustomOpenPicker = styled(IconCalendar)<{ open: boolean }>`
  width: 2.4rem;

  fill: ${({ open, theme }) => (open ? theme.colors.gray_0 : theme.colors.gray_600)};
`;
