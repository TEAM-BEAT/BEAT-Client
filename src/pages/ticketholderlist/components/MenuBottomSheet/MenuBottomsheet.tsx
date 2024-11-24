import { Children, isValidElement, ReactNode, useEffect } from "react";
import * as S from "./MenuBottomSheet.styled";
import BottomSheet from "@components/commons/bottomSheet/BottomSheet";
import OuterLayout from "@components/commons/bottomSheet/OuterLayout";
import { Button, Spacing } from "@components/commons";

interface MenuBottomSheetProps {
  isOpen: boolean;
  children?: ReactNode;
  onClickOutside: () => void;
  handleStatus: (status: string) => void;
}

const MenuBottomsheet = ({
  isOpen,
  onClickOutside,
  children,
  handleStatus,
  ...rest
}: MenuBottomSheetProps) => {
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
    <S.MenuBottomSheetWrapper $isOpen={isOpen} onClick={handleWrapperClick}>
      <BottomSheet isOpen={isOpen} paddingTop="2.4rem">
        <Button onClick={() => handleStatus("PAYMENT")} size="xlarge" variant="gray">
          입금 처리하기
        </Button>
        <Spacing marginBottom="1.2" />
        <Button onClick={() => handleStatus("REFUND")} size="xlarge" variant="gray">
          환불 처리하기
        </Button>
        <Spacing marginBottom="1.2" />
        <Button onClick={() => handleStatus("DELETE")} size="xlarge" variant="gray">
          예매자 삭제하기
        </Button>
      </BottomSheet>
    </S.MenuBottomSheetWrapper>
  );
};

export default MenuBottomsheet;
