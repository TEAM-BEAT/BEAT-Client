import { IcRadioSelected, IcRadioUnselected } from "@assets/svgs";
import * as S from "./RadioButton.styled";

interface RadioButtonProps {
  label: string;
  description?: string;
  value: number;
  checked: boolean;
  onChange: (value: number) => void;
}

const RadioButton = ({ label, description, value, checked, onChange }: RadioButtonProps) => {
  const variant = checked ? "selected" : "initial";

  return (
    <S.ButtonBox $variant={variant} onClick={() => onChange(value)}>
      <S.LabelWrapper>
        <span>{label}</span>
        {description && <S.Description>{description}</S.Description>}
      </S.LabelWrapper>
      {checked ? <IcRadioSelected width={32} /> : <IcRadioUnselected width={32} />}
    </S.ButtonBox>
  );
};

export default RadioButton;
