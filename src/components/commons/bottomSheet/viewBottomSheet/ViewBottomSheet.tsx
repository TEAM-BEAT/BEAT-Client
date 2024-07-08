import * as S from "./ViewBottomSheet.styled";
import BottomSheet from "@components/commons/bottomSheet/BottomSheet";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import ContextBox from "@components/commons/contextBox/ContextBox";

import React, { ReactNode, Children, isValidElement } from "react";

interface ViewBottomSheetProps {
  title?: string;
  boxTitle?: string;
  boxTitleColor?: string;
  children?: ReactNode;
  onClickOutside: () => void;
}

const ViewBottomSheet = ({
  title,
  boxTitle,
  boxTitleColor,
  onClickOutside,
  children,
  ...rest
}: ViewBottomSheetProps) => {
  const childrenArray = Children.toArray(children);

  const contextChildren = childrenArray.filter(
    (child) => isValidElement(child) && child.type !== OuterLayout
  );

  const remainingChildren = childrenArray.filter(
    (child) => !isValidElement(child) || child.type === OuterLayout
  );

  const handleWrapperClick = () => {
    onClickOutside();
  };

  return (
    <S.ViewBottomSheetWrapper onClick={handleWrapperClick}>
      <BottomSheet title={title}>
        <ContextBox {...rest}>
          <S.BoxTitle customColor={boxTitleColor}>{boxTitle}</S.BoxTitle>
          <S.BoxDivider />
          {contextChildren}
        </ContextBox>
        {remainingChildren}
      </BottomSheet>
    </S.ViewBottomSheetWrapper>
  );
};

export default ViewBottomSheet;
