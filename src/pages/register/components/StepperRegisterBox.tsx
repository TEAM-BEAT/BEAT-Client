import Spacing from "@components/commons/spacing/Spacing";
import * as S from "../Register.styled";
import { ReactNode } from "react";

interface StepperRegisterBoxProps {
  title: string;
  marginBottom?: number;
  children: ReactNode;
}

const StepperRegisterBox = ({ title, marginBottom = 1.6, children }: StepperRegisterBoxProps) => {
  return (
    <S.StepperRegisterBox $marginBottom={marginBottom}>
      <S.InputTitle>{title}</S.InputTitle>
      {children}
    </S.StepperRegisterBox>
  );
};

export default StepperRegisterBox;
