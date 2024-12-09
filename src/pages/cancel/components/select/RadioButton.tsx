import { IcRadioSelected, IcRadioUnselected } from "@assets/svgs";
import * as S from "./RadioButton.styled";

interface RadioButtonProps {
  label: string;
  value: number;
  checked: boolean;
  onChange: (value: number) => void;
}

const RadioButton = ({ label, value, checked, onChange }: RadioButtonProps) => {
  const variant = checked ? "selected" : "initial";

  return (
    <S.ButtonBox $variant={variant} onClick={() => onChange(value)}>
      <span>{label}</span>
      {checked ? <IcRadioSelected width={20} /> : <IcRadioUnselected width={20} />}
    </S.ButtonBox>
  );
};

export default RadioButton;
