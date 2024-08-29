import styled from "styled-components";
import RadioButton from "./RadioButton";
import { SelectProps } from "./Select";

const RadioGroup = ({ selectedValue, handleRadioChange, scheduleList }: SelectProps) => {
  // 날짜별로 그룹화
  const groupedSchedules = scheduleList.reduce((acc, schedule) => {
    const date = schedule.performanceDate.split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(schedule);
    return acc;
  }, {});
  const groupedSchedulesList = Object.entries(groupedSchedules);

  return (
    <RadioGroupWrapper>
      {groupedSchedulesList.map(([date, schedules], i) => (
        <Container key={`schedule-group-${i}`}>
          <DateText>{date.replace(/-/g, ". ")}</DateText>
          <ButtonWrapper>
            {schedules.map((schedule, j) => (
              <RadioButton
                key={`schedule-${i}-${j}`}
                label={schedule.performanceDate ?? ""}
                value={schedule.scheduleId ?? 0}
                checked={selectedValue === schedule.scheduleId}
                isDisabled={schedule.availableTicketCount === 0 || !schedule.isBooking}
                onChange={handleRadioChange}
              />
            ))}
          </ButtonWrapper>
        </Container>
      ))}
    </RadioGroupWrapper>
  );
};

export default RadioGroup;

export const RadioGroupWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Container = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DateText = styled.p`
  color: ${({ theme }) => theme.colors.gray_100};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

const ButtonWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px 9px;
`;
