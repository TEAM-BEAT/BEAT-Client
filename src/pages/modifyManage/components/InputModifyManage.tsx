import { IconChecked } from "@assets/svgs";
import Spacing from "@components/commons/spacing/Spacing";
import { ReactNode } from "react";
import * as S from "../ModifyManage.styled";

interface InputModifyManageBoxProps {
  title: string;
  description?: string;
  marginBottom?: number;
  children: ReactNode;
  isFree?: boolean; // 무료공연 체크박스
  onFreeClick?: () => void;
}

const InputModifyManageBox = ({
  title,
  description,
  marginBottom = 1.6,
  children,
  isFree,
  onFreeClick,
}: InputModifyManageBoxProps) => {
  return (
    <S.InputModifyManageBox $marginBottom={marginBottom}>
      <S.InputTitle>
        {title}
        {description && (
          <S.CheckBox>
            무료 공연
            {isFree ? (
              <IconChecked width={18} onClick={onFreeClick} />
            ) : (
              <S.NonCheck onClick={onFreeClick} />
            )}
          </S.CheckBox>
        )}
      </S.InputTitle>
      <S.InputDescription warning={true}>{description}</S.InputDescription>
      <Spacing marginBottom={"1.4"} />
      {children}
    </S.InputModifyManageBox>
  );
};

export default InputModifyManageBox;
