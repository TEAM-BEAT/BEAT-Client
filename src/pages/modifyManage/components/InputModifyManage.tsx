import { IconChecked } from "@assets/svgs";
import Spacing from "@components/commons/spacing/Spacing";
import { ReactNode } from "react";
import * as S from "../ModifyManage.styled";

interface InputModifyManageBoxProps {
  isDisabled: boolean;
  title: string;
  description?: string;
  marginBottom?: number;
  children: ReactNode;
  isFree?: boolean; // 무료공연 체크박스
  onFreeClick?: () => void;
}

const InputModifyManageBox = ({
  isDisabled,
  title,
  description,
  marginBottom = 1.6,
  children,
  isFree,
  onFreeClick,
}: InputModifyManageBoxProps) => {
  const handleOnFreeClick = (_isDisabled: boolean) => {
    if (!_isDisabled) {
      onFreeClick?.();
    }
  };
  return (
    <S.InputModifyManageBox $marginBottom={marginBottom}>
      <S.InputTitle>
        {title}
        {description && (
          <S.CheckBox>
            무료 공연
            {isFree ? (
              <IconChecked width={18} onClick={() => handleOnFreeClick(isDisabled)} />
            ) : (
              <S.NonCheck onClick={() => handleOnFreeClick(isDisabled)} />
            )}
          </S.CheckBox>
        )}
      </S.InputTitle>
      <S.InputDescription $warning={true}>{description}</S.InputDescription>
      <Spacing marginBottom={"1.4"} />
      {children}
    </S.InputModifyManageBox>
  );
};

export default InputModifyManageBox;
