import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import * as S from "./TimePicker.styled";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export interface TimePickerProps {
  value: Dayjs | null;
  onChangeValue: (value: Dayjs | null) => void;
}

const StyledDay = styled(PickersDay)(({ theme }) => ({
  width: "37rem",
  borderRadius: theme.shape.borderRadius,
}));

const TimePicker = ({ value, onChangeValue }: TimePickerProps) => {
  const [open, setOpen] = useState(false);
  const handleAccept = (newValue: Dayjs | null) => {
    if (newValue) {
      onChangeValue(newValue);
    }
  };
  return (
    <>
      <S.CustomPicker
        disablePast
        showDaysOutsideCurrentMonth
        format={"YYYY/MM/DD HH:mm"}
        slots={{
          day: StyledDay,
          openPickerIcon: (props) => <S.CustomOpenPicker open={open} />,
        }}
        value={value}
        onAccept={handleAccept}
        slotProps={{
          popper: {
            sx: {
              "& .MuiPaper-root": {
                width: "32.7rem",
                height: "33rem",
              },
              "& .MuiPickersLayout-root": {
                maxWidth: "100%",
                maxHeight: "100%",
              },
              "& .MuiPickersLayout-contentWrapper": {
                width: "100%",
                height: "28.7rem",
              },
              "& .MuiDateCalendar-root": {
                width: "21rem",
                height: "28.7rem",
              },
              "& .MuiTypography-caption": {
                width: " 30px",
                height: "31px",
              },
              "& .MuiPickersCalendarHeader-label": {
                fontSize: "1.3rem",
              },
              "button.MuiPickersDay-root.Mui-selected": {
                background: "#FB247F",
              },

              "& .MuiMultiSectionDigitalClockSection-item": {
                width: "30px",
                height: "20px",
                fontSize: "1.3rem",
              },
              "& .MuiMultiSectionDigitalClockSection-item.Mui-selected": {
                background: "#FB247F",
              },
              "&. MuiMultiSectionDigitalClock-root": {
                height: "25.7rem",
              },

              "& .MuiPickersDay-root": {
                fontSize: "1.3rem",
              },
              "& .MuiDayCalendar-weekDayLabel": {
                fontSize: "1.3rem",
              },
              "& .MuiButton-text": {
                color: "#FB247F",
                fontSize: "1.3rem",
                margin: "0",
                padding: "0",
              },
              "& .MuiPickersLayout-actionBar": {
                display: "flex",
                alignItems: "center",
                height: "fit-content",
              },
              "& .MuiYearCalendar-root": {
                width: "21rem",
              },
            },
          },
        }}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default TimePicker;
