import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import { isSelectableCalendarDate } from "./datePicker.utils";

interface DatePickerProps {
  date: Date | undefined;
  onChangeDate: (date: Date) => void;
}

const DatePicker = ({ date, onChangeDate }: DatePickerProps) => {
  const isDisabledDate = (date: Date) => !isSelectableCalendarDate(date);

  return (
    <Calendar
      value={date}
      onChange={onChangeDate}
      calendarType="gregory"
      locale="ko-KR"
      className="custom-calendar"
      formatDay={(_, date) => date.getDate().toString()}
      tileDisabled={({ date }) => isDisabledDate(date)}
      tileClassName={({ date }) => (isDisabledDate(date) ? "past-date" : "")}
    />
  );
};

export default DatePicker;
