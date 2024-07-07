import * as S from "./Stepper.styled";
import { IconMinus, IconPlus } from "@assets/svgs";

export interface StepperProps {
  max: number;
  round: number;
  setRound: (round: number) => void;
}

const Stepper = ({ round, max, setRound }: StepperProps) => {
  return (
    <S.StepperWrapper>
      <S.StepperBtn
        disabled={round === 1}
        onClick={() => {
          setRound(round - 1);
        }}
      >
        <IconMinus />
      </S.StepperBtn>
      <S.StepperNum>{round}</S.StepperNum>
      <S.StepperBtn
        disabled={max === round}
        onClick={() => {
          setRound(round + 1);
        }}
      >
        <IconPlus />
      </S.StepperBtn>
    </S.StepperWrapper>
  );
};

export default Stepper;
