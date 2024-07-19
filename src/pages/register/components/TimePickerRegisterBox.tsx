import Spacing from "@components/commons/spacing/Spacing";
import * as S from "../Register.styled";
import { ReactNode } from "react";

interface TimePickerRegisterBoxProps {
  title: string;
  description?: string;
  marginBottom?: number;
  children: ReactNode;
}

const TimePickerRegisterBox = ({
  title,
  description,
  marginBottom = 1.6,
  children,
}: TimePickerRegisterBoxProps) => {
  return (
    <S.TimePickerRegisterBox $marginBottom={marginBottom}>
      <S.InputTitle>{title}</S.InputTitle>
      <S.InputDescription $warning={true}>{description}</S.InputDescription>
      <Spacing marginBottom="1.4" />
      <S.TimePickerWrapper>{children}</S.TimePickerWrapper>
    </S.TimePickerRegisterBox>
  );
};

export default TimePickerRegisterBox;
