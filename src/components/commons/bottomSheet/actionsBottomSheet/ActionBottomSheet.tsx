import * as S from "./ActionBottomSheet.styled";

import BottomSheet from "@components/commons/bottomSheet/BottomSheet";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import ContextBox from "@components/commons/contextBox/ContextBox";
import { ContextBoxStyle } from "@typings/contextBoxProps";

import React, { ReactNode, Children, isValidElement } from "react";

interface ActionBottomSheetProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ContextBoxStyle {
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
        <ContextBox {...rest}>
          <S.SubTitle>{subTitle}</S.SubTitle>
          {innerChildren}
        </ContextBox>
        {outerChildren}
      </BottomSheet>
    </S.ActionBottomSheetWrapper>
  );
};

export default ActionBottomSheet;
