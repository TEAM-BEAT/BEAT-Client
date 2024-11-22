import Spacing from "../spacing/Spacing";
import * as S from "./RenewTimePicker.styled";

interface RenewTimePickerProps {
  isPM: boolean;
  selectedHour: number;
  selectedMinute: number;
  onChangeTime: (type: "hour" | "minute" | "isPM", value: number | boolean) => void;
}

const RenewTimePicker = ({
  isPM,
  selectedHour,
  selectedMinute,
  onChangeTime,
}: RenewTimePickerProps) => {
  const hours = Array.from({ length: 12 }, (_, i) => ((i + 11) % 12) + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  return (
    <S.Wrapper>
      <div>
        <S.GridTitle>시</S.GridTitle>
        <S.GridTitle>분</S.GridTitle>
      </div>

      <S.TimePickerContainer>
        <S.ButtonGroup>
          <S.StyledButton $isActive={!isPM} onClick={() => onChangeTime("isPM", false)}>
            오전
          </S.StyledButton>
          <S.StyledButton $isActive={isPM} onClick={() => onChangeTime("isPM", true)}>
            오후
          </S.StyledButton>
        </S.ButtonGroup>

        <S.TimeGrid>
          {hours.map((hour, i) => {
            return (
              <S.GridButton
                key={hour}
                $isActive={selectedHour === hour}
                onClick={() => onChangeTime("hour", hour)}
              >
                {hour}
              </S.GridButton>
            );
          })}
        </S.TimeGrid>

        <Spacing marginBottom="2.4" />

        <S.TimeGrid>
          {minutes.map((min) => (
            <S.GridButton
              key={min}
              $isActive={selectedMinute === min}
              onClick={() => onChangeTime("minute", min)}
            >
              {min.toString().padStart(2, "0")}
            </S.GridButton>
          ))}
        </S.TimeGrid>
      </S.TimePickerContainer>
    </S.Wrapper>
  );
};

export default RenewTimePicker;
