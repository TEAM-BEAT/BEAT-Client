import { ReactNode } from "react";
import * as S from "../ModifyManage.styled";

interface StepperModifyManageBoxProps {
  title: string;
  description: string;
  marginBottom?: number;
  children: ReactNode;
}

const StepperModifyManageBox = ({
  title,
  description,
  marginBottom = 1.6,
  children,
}: StepperModifyManageBoxProps) => {
  return (
    <S.StepperModifyManageBox $marginBottom={marginBottom}>
      <S.InputTitleLayout>
        <S.InputTitleWrapper>
          <S.InputTitle>{title}</S.InputTitle>
          <S.StepperDiscription>{description}</S.StepperDiscription>
        </S.InputTitleWrapper>
        <S.InputDescription $warning={true}>*회차 수는 수정불가합니다.</S.InputDescription>
      </S.InputTitleLayout>
      {children}
    </S.StepperModifyManageBox>
  );
};

export default StepperModifyManageBox;
