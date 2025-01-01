import Spacing from "@components/commons/spacing/Spacing";
import * as S from "../Register.styled";
import { ReactNode } from "react";
import { IcNoti } from "@assets/svgs";

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
    <S.InputRegisterBox $marginBottom={1.6}>
      <S.StepperRegisterBox $marginBottom={marginBottom}>
        <S.InputTitleWrapper>
          <S.InputTitle>{title}</S.InputTitle>
          <S.StepperDiscription>{description}</S.StepperDiscription>
        </S.InputTitleWrapper>
        {children}
      </S.StepperRegisterBox>
      <S.NotiDiscription>
        <IcNoti width={20} />
        회차 수정은 이후 불가합니다.
      </S.NotiDiscription>
    </S.InputRegisterBox>
  );
};

export default StepperRegisterBox;
