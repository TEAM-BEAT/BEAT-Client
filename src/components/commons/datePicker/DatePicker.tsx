import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
interface DatePickerProps {
  date: Date | undefined;
  onChangeDate: (date: Date) => void;
}

const DatePicker = ({ date, onChangeDate }: DatePickerProps) => {
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
  };

  return (
    <Calendar
      value={date}
      onChange={onChangeDate}
      calendarType="gregory"
      locale="ko-KR"
      className="custom-calendar"
      formatDay={(_, date) => date.getDate().toString()}
      tileClassName={({ date }) => (isPastDate(date) ? "past-date" : "")}
    />
  );
};

export default DatePicker;
