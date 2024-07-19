import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import * as S from "./TimePicker.styled";

export interface TimePickerProps {
  value: Dayjs | null | string;
  onChangeValue: (value: Dayjs | null) => void;
  minDate?: Dayjs;
  disabled?: boolean;
}

const StyledDay = styled(PickersDay)(({ theme }) => ({
  width: "37rem",
  borderRadius: theme.shape.borderRadius,
}));

const TimePicker = ({ value, disabled, onChangeValue, minDate }: TimePickerProps) => {
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const handleAccept = (newValue: Dayjs | null) => {
    if (newValue) {
      onChangeValue(newValue);
    }
  };

  useEffect(() => {
    const now = dayjs().format("YYYY/MM/DD\t     HH:mm");
    setPlaceholder(now);
  }, []);

  return (
    <S.CustomPicker
      disablePast
      disabled={disabled}
      showDaysOutsideCurrentMonth
      closeOnSelect={false}
      format={"YYYY/MM/DD\t     HH:mm"}
      slots={{
        day: StyledDay,

        openPickerIcon: (props) => <S.CustomOpenPicker $open={open} />,
      }}
      value={value ? dayjs(new Date(value as string)) : null}
      minDate={minDate || undefined}
      onAccept={handleAccept}
      slotProps={{
        textField: { placeholder },
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
              width: "3rem",
              height: "3.1rem",
            },
            "& .MuiPickersCalendarHeader-label": {
              fontSize: "1.3rem",
            },
            "& .MuiPickersYear-yearButton": {
              fontSize: "1.3rem",
            },
            "& .MuiPickersYear-yearButton.Mui-selected": {
              background: "#FB247F",
              color: "#FFFFFF",
            },
            "& .MuiPickersYear-yearButton.Mui-selected:hover": {
              background: "#FB247F",
              color: "#FFFFFF",
            },
            "button.MuiPickersDay-root.Mui-selected": {
              background: "#FB247F",
              color: "#FFFFFF",
            },
            "& .MuiMultiSectionDigitalClockSection-list": {
              "&::-webkit-scrollbar": {
                background: "#FB247F",
              },
            },
            "& .MuiMultiSectionDigitalClockSection-item": {
              width: "3rem",
              height: "3rem",
              fontSize: "1.3rem",
              borderRadius: "3px",
            },
            "& .MuiMultiSectionDigitalClockSection-item.Mui-selected": {
              background: "#FB247F",
              color: "#FFFFFF",
            },
            "& .MuiMultiSectionDigitalClockSection-item.Mui-selected:hover": {
              background: "#FB247F",
              color: "#FFFFFF",
            },
            "&.MuiMultiSectionDigitalClock-root": {
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
  );
};

export default TimePicker;
