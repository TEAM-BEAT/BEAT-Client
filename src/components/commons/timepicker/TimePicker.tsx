import * as S from "./TimePicker.styled";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { styled } from "@mui/material/styles";

const StyledDay = styled(PickersDay)(({ theme }) => ({
  width: "37rem",
  borderRadius: theme.shape.borderRadius,
  color:
    theme.palette.mode === "light" ? theme.palette.secondary.dark : theme.palette.secondary.light,
}));

const TimePicker = () => {
  return (
    <S.CustomPicker
      showDaysOutsideCurrentMonth
      format="YYYY/MM/DD HH:MM"
      slots={{
        day: StyledDay,
      }}
    />
  );
};

export default TimePicker;
