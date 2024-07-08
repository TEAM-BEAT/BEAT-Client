import * as S from "./ActionBottomSheet.styled";

import BottomSheet from "@components/commons/bottomSheet/BottomSheet";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import ContextBox from "@components/commons/contextBox/ContextBox";

import { ReactNode, Children, isValidElement } from "react";

interface ActionBottomSheetProps {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
}

const ActionBottomSheet = ({ title, subTitle, children, ...rest }: ActionBottomSheetProps) => {
  const childrenArray = Children.toArray(children);

  const innerChildren = childrenArray.filter(
    (child) => isValidElement(child) && child.type !== OuterLayout
  );

  const outerChildren = childrenArray.filter(
    (child) => !isValidElement(child) || child.type === OuterLayout
  );

  return (
    <S.ActionBottomSheetWrapper>
      <BottomSheet title={title}>
        <ContextBox customAlignItems="center" customPadding="2rem 2rem 2.4rem 2rem" {...rest}>
          <S.SubTitle>{subTitle}</S.SubTitle>
          {innerChildren}
        </ContextBox>
        {outerChildren}
      </BottomSheet>
    </S.ActionBottomSheetWrapper>
  );
};

export default ActionBottomSheet;
