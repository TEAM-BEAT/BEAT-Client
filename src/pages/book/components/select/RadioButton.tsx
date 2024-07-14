import * as S from "./RadioButton.styled";

interface RadioButtonProps {
  label: string;
  value: number;
  checked: boolean;
  isSoldOut: boolean;
  onChange: (value: number) => void;
}

const RadioButton = ({ label, value, checked, isSoldOut, onChange }: RadioButtonProps) => {
  const [date, time] = label.split("T");
  return (
    <S.Label checked={checked} $isSoldOut={isSoldOut}>
      <div>
        <S.Text>{date}</S.Text>
        <S.DateTimeDivider />
        <S.Text>{time.slice(0, 5)}</S.Text>
      </div>

      {isSoldOut ? (
        <S.SoldOutText>매진</S.SoldOutText>
      ) : (
        <>
          <S.Input type="radio" value={value} checked={checked} onChange={() => onChange(value)} />
          <S.CustomRadio checked={checked} />
        </>
      )}
    </S.Label>
  );
};

export default RadioButton;
