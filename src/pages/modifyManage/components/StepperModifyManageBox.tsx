import { ReactNode } from "react";
import * as S from "../ModifyManage.styled";
import Spacing from "@components/commons/spacing/Spacing";

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
    <S.InputModifyManageBox $marginBottom={marginBottom}>
      <S.StepperModifyManageBox $marginBottom={0}>
        <S.InputTitleLayout>
          <S.InputTitleWrapper>
            <S.InputTitle>{title}</S.InputTitle>
            <S.StepperDiscription>{description}</S.StepperDiscription>
          </S.InputTitleWrapper>
        </S.InputTitleLayout>
        {children}
      </S.StepperModifyManageBox>
      <S.InputDescription $warning={true}>*기존 회차는 삭제가 불가능합니다.</S.InputDescription>
    </S.InputModifyManageBox>
  );
};

export default StepperModifyManageBox;
