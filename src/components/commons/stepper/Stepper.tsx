import { useState } from "react";
import * as S from "./Stepper.styled";
import { IconMinus, IconPlus } from "@assets/svgs";

export interface StepperProps {
  max: number;
  round: number;
  onMinusClick: () => void;
  onPlusClick: () => void;
}

const Stepper = ({ round, max, onMinusClick, onPlusClick }: StepperProps) => {
  const [num, setNum] = useState(round);
  return (
    <S.StepperWrapper>
      <S.StepperBtn
        disabled={round === 1}
        onClick={() => {
          setNum((prev) => prev - 1);
          onMinusClick();
        }}
      >
        <IconMinus />
      </S.StepperBtn>
      <S.StepperNum>{round}</S.StepperNum>
      <S.StepperBtn
        disabled={max === round}
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
