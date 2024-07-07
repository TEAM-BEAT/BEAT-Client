import * as S from "./ActionBottomSheet.styled";

import BottomSheet from "../BottomSheet";
import ContextBox from "@components/commons/contextBox/ContextBox";
import PhoneNumber from "@components/commons/bottomSheet/actionsBottomSheet/phoneNumber/PhoneNumber";

import { ReactNode, Children, isValidElement } from "react";

interface ActionBottomSheetProps {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
}

const ActionBottomSheet = ({ title, subTitle, children, ...rest }: ActionBottomSheetProps) => {
  const childrenArray = Children.toArray(children);

  const numberChildren = childrenArray.filter(
    (child) => isValidElement(child) && child.type === PhoneNumber
  );

  const remainingChildren = childrenArray.filter(
    (child) => !isValidElement(child) || child.type !== PhoneNumber
  );

  return (
    <S.ActionBottomSheetWrapper>
      <BottomSheet title={title}>
        <ContextBox customAlignItems="center" customPadding="2rem 2rem 2.4rem 2rem" {...rest}>
          <S.SubTitle>{subTitle}</S.SubTitle>
          {numberChildren}
        </ContextBox>
        {remainingChildren}
      </BottomSheet>
    </S.ActionBottomSheetWrapper>
  );
};

export default ActionBottomSheet;
