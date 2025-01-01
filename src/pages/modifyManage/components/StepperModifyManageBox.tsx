import { ReactNode } from "react";
import * as S from "../ModifyManage.styled";
import Spacing from "@components/commons/spacing/Spacing";
import { IcNoti } from "@assets/svgs";

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
      <S.NotiDiscription>
        <IcNoti width={20} />
        회차 수정은 이후 불가합니다.
      </S.NotiDiscription>{" "}
    </S.InputModifyManageBox>
  );
};

export default StepperModifyManageBox;
