import RadioGroup from "./RadioGroup";
import * as S from "./Select.styled";

export interface ScheduleListTypes {
  scheduleId?: number;
  performanceDate?: string;
  availableTicketCount?: number;
  scheduleNumber?: string;
  dueDate?: number;
  isBooking?: boolean;
}

export interface SelectProps {
  selectedValue: number;
  handleRadioChange: (value: number) => void;
  scheduleList: ScheduleListTypes[];
}

const Select = ({ selectedValue, handleRadioChange, scheduleList }: SelectProps) => {
  return (
    <S.Wrapper>
      <S.Title>회차 선택</S.Title>
      <RadioGroup
        selectedValue={selectedValue}
        handleRadioChange={handleRadioChange}
        scheduleList={scheduleList}
      />
    </S.Wrapper>
  );
};

export default Select;
