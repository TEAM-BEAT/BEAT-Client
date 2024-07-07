import * as S from "./ViewBottomSheet.styled";
import BottomSheet from "../BottomSheet";
import ContextBox from "@components/commons/contextBox/ContextBox";
import Context from "@components/commons/contextBox/Context";

import { ReactNode, Children, isValidElement } from "react";

interface ViewBottomSheetProps {
  title?: string;
  boxTitle?: string;
  children?: ReactNode;
}

const ViewBottomSheet = ({ title, boxTitle, children, ...rest }: ViewBottomSheetProps) => {
  const childrenArray = Children.toArray(children);

  const contextChildren = childrenArray.filter(
    (child) => isValidElement(child) && child.type === Context
  );

  const remainingChildren = childrenArray.filter(
    (child) => !isValidElement(child) || child.type !== Context
  );

  return (
    <S.ViewBottomSheetWrapper>
      <BottomSheet title={title}>
        <ContextBox customPadding="1.6rem 1.6rem" {...rest}>
          <S.BoxTitle customColor="pink_200">{boxTitle}</S.BoxTitle>
          <S.BoxDivider />
          {contextChildren}
        </ContextBox>
        {remainingChildren}
      </BottomSheet>
    </S.ViewBottomSheetWrapper>
  );
};

export default ViewBottomSheet;
