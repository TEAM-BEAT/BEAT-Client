import { IconMinus, IconPlus } from "@assets/svgs";
import { useState } from "react";
import * as S from "./Stepper.styled";

export interface StepperProps {
  max: number;
  round: number;
  disabled?: boolean;
  onMinusClick: () => void;
  onPlusClick: () => void;
}

const Stepper = ({ round, max, disabled, onMinusClick, onPlusClick }: StepperProps) => {
  const [num, setNum] = useState(round);
  return (
    <S.StepperWrapper>
      <S.StepperBtn
        disabled={round === 1 || disabled}
        onClick={() => {
          setNum((prev) => prev - 1);
          onMinusClick();
        }}
      >
        <IconMinus />
      </S.StepperBtn>
      <S.StepperNum>{round}</S.StepperNum>
      <S.StepperBtn
        disabled={max === 1 || disabled}
        onClick={() => {
          setNum((prev) => prev + 1);
          onPlusClick();
        }}
      >
        <IconPlus />
      </S.StepperBtn>
    </S.StepperWrapper>
  );
};

export default Stepper;
