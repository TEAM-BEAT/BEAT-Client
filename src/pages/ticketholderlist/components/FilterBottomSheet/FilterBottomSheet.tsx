import React, { useState, ReactNode } from "react";
import * as S from "./FilterBottomSheet.styled";
import { BottomSheet, Button } from "@components/commons";
import { BoxDivider } from "@components/commons/bottomSheet/viewBottomSheet/ViewBottomSheet.styled";

interface FilterBottomSheetProps {
  isOpen: boolean;
  children?: ReactNode;
  onClickOutside?: () => void;
}

const bookingStatusList = ["미입금", "입금 완료", "환불 요청", "취소 완료"];

const FilterBottomSheet = ({ isOpen, onClickOutside, children }: FilterBottomSheetProps) => {
  const [checkedStatusList, setCheckedStatusList] = useState<string[]>([]);

  const handleWrapperClick = () => {
    onClickOutside();
  };

  const handleCheck = (status: string) => {
    setCheckedStatusList((prev) =>
      prev.includes(status) ? prev.filter((item) => item !== status) : [...prev, status]
    );
  };

  return (
    <S.FilterBottomSheetWrapper $isOpen={isOpen} onClick={handleWrapperClick}>
      <BottomSheet isOpen={isOpen}>
        <S.TitleWrapper>
          회차
          <S.RefreshBtn>
            <S.RefreshIcon />
          </S.RefreshBtn>
        </S.TitleWrapper>
        <S.TitleWrapper>입금 상태</S.TitleWrapper>
        <S.CheckBoxContainer>
          <S.CheckBoxRow>
            {bookingStatusList.slice(0, 2).map((status, idx) => (
              <S.CheckBoxLabel key={idx}>
                <S.CheckBox
                  type="checkbox"
                  checked={checkedStatusList.includes(status)}
                  onChange={() => handleCheck(status)}
                />
                {checkedStatusList.includes(status) ? <S.SelectIcon /> : <S.UnSelectIcon />}
                <S.CheckBoxText>{status}</S.CheckBoxText>
              </S.CheckBoxLabel>
            ))}
          </S.CheckBoxRow>
          <S.CheckBoxRow>
            {bookingStatusList.slice(2, 4).map((status, idx) => (
              <S.CheckBoxLabel key={idx}>
                <S.CheckBox
                  type="checkbox"
                  checked={checkedStatusList.includes(status)}
                  onChange={() => handleCheck(status)}
                />
                {checkedStatusList.includes(status) ? <S.SelectIcon /> : <S.UnSelectIcon />}
                <S.CheckBoxText>{status}</S.CheckBoxText>
              </S.CheckBoxLabel>
            ))}
          </S.CheckBoxRow>
        </S.CheckBoxContainer>
        <Button>적용하기</Button>
      </BottomSheet>
    </S.FilterBottomSheetWrapper>
  );
};

export default FilterBottomSheet;
