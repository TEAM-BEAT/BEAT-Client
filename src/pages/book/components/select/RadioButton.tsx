import styled, { css } from "styled-components";
import * as S from "./RadioButton.styled";

interface RadioButtonProps {
  label: string;
  value: number;
  checked: boolean;
  isDisabled: boolean;
  onChange: (value: number) => void;
}

const RadioButton = ({ label, value, checked, isDisabled, onChange }: RadioButtonProps) => {
  const [, time] = label.split("T");
  const variant = checked ? "selected" : isDisabled ? "disabled" : "initial";

  return (
    <S.ButtonBox disabled={isDisabled} $variant={variant} onClick={() => onChange(value)}>
      <span>{time.slice(0, 5)}</span>
    </S.ButtonBox>
  );
};

export default RadioButton;
