import BottomSheet from "@components/commons/bottomSheet/BottomSheet";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import ContextBox from "@components/commons/contextBox/ContextBox";
import * as S from "./ViewBottomSheet.styled";

import { Children, isValidElement, ReactNode, useEffect } from "react";

interface ViewBottomSheetProps {
  isOpen: boolean;
  title?: string;
  boxTitle?: string;
  boxTitleColor?: string;
  children?: ReactNode;
  onClickOutside: () => void;
}

const ViewBottomSheet = ({
  isOpen,
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
    <S.ViewBottomSheetWrapper $isOpen={isOpen} onClick={handleWrapperClick}>
      <BottomSheet isOpen={isOpen} title={title}>
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
