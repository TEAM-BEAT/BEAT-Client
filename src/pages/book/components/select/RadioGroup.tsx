import styled from "styled-components";
import RadioButton from "./RadioButton";
import { SelectProps } from "./Select";

const RadioGroup = ({ selectedValue, handleRadioChange, scheduleList }: SelectProps) => {
  return (
    <RadioGroupWrapper>
      {scheduleList.map((schedule, i) => (
        <RadioButton
          key={`schedule-${i}`}
          label={schedule.performanceDate}
          value={schedule.scheduleId}
          checked={selectedValue === schedule.scheduleId}
          isSoldOut={schedule.availableTicketCount === 0}
          onChange={handleRadioChange}
        />
      ))}
    </RadioGroupWrapper>
  );
};

export default RadioGroup;

export const RadioGroupWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
