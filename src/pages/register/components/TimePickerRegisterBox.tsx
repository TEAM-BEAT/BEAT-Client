import Spacing from "@components/commons/spacing/Spacing";
import * as S from "../Register.styled";
import { ReactNode } from "react";

interface TimePickerRegisterBoxProps {
  title: string;
  marginBottom?: number;
  children: ReactNode;
}

const TimePickerRegisterBox = ({
  title,
  marginBottom = 1.6,
  children,
}: TimePickerRegisterBoxProps) => {
  return (
    <S.TimePickerRegisterBox $marginBottom={marginBottom}>
      <S.InputTitle>{title}</S.InputTitle>
      <Spacing marginBottom={"1.4"} />
      {children}
    </S.TimePickerRegisterBox>
  );
};

export default TimePickerRegisterBox;
