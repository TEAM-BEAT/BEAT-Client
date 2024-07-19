import Spacing from "@components/commons/spacing/Spacing";
import { ReactNode } from "react";
import * as S from "../ModifyManage.styled";

interface TimePickerModifyManageBoxProps {
  title: string;
  description?: string;
  marginBottom?: number;
  children: ReactNode;
}

const TimePickerModifyManageBox = ({
  title,
  description,
  marginBottom = 1.6,
  children,
}: TimePickerModifyManageBoxProps) => {
  return (
    <S.TimePickerModifyManageBox $marginBottom={marginBottom}>
      <S.InputTitle>{title}</S.InputTitle>
      <S.InputDescription $warning={true}>{description}</S.InputDescription>
      <Spacing marginBottom="1.4" />
      <S.TimePickerWrapper>{children}</S.TimePickerWrapper>
    </S.TimePickerModifyManageBox>
  );
};

export default TimePickerModifyManageBox;
