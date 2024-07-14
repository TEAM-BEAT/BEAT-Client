import Spacing from "@components/commons/spacing/Spacing";
import * as S from "../Register.styled";
import { ReactNode } from "react";

interface StepperRegisterBoxProps {
  title: string;
  description: string;
  marginBottom?: number;
  children: ReactNode;
}

const StepperRegisterBox = ({
  title,
  description,
  marginBottom = 1.6,
  children,
}: StepperRegisterBoxProps) => {
  return (
    <S.StepperRegisterBox $marginBottom={marginBottom}>
      <S.InputTitleWrapper>
        <S.InputTitle>{title}</S.InputTitle>
        <S.StepperDiscription>{description}</S.StepperDiscription>
      </S.InputTitleWrapper>
      {children}
    </S.StepperRegisterBox>
  );
};

export default StepperRegisterBox;
