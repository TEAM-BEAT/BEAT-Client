import * as S from "./ActionBottomSheet.styled";

import BottomSheet from "@components/commons/bottomSheet/BottomSheet";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import ContextBox from "@components/commons/contextBox/ContextBox";
import { ContextBoxStyle } from "@typings/contextBoxProps";

import React, { Children, isValidElement, ReactNode, useEffect } from "react";

interface ActionBottomSheetProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ContextBoxStyle {
  isOpen: boolean;
  title?: string;
  subTitle?: string;
  children?: ReactNode;
  onClickOutside: () => void;
}

const ActionBottomSheet = ({
  isOpen,
  title,
  subTitle,
  onClickOutside,
  children,
  ...rest
}: ActionBottomSheetProps) => {
  const childrenArray = Children.toArray(children);

  const innerChildren = childrenArray.filter(
    (child) => isValidElement(child) && child.type !== OuterLayout
  );

  const outerChildren = childrenArray.filter(
    (child) => !isValidElement(child) || child.type === OuterLayout
  );

  const handleWrapperClick = () => {
    onClickOutside();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <S.ActionBottomSheetWrapper $isOpen={isOpen} onClick={handleWrapperClick}>
      <BottomSheet isOpen={isOpen} title={title}>
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
