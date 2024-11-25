import React, { useState, ReactNode } from "react";
import * as S from "./FilterBottomSheet.styled";
import { BottomSheet, Button, Spacing } from "@components/commons";

interface FilterBottomSheetProps {
  isOpen: boolean;
  totalScheduleCount: number;
  children?: ReactNode;
  onClickOutside?: () => void;
}

const bookingStatusList = ["미입금", "입금 완료", "환불 요청", "취소 완료"];

const FilterBottomSheet = ({
  isOpen,
  onClickOutside,
  totalScheduleCount,
  children,
}: FilterBottomSheetProps) => {
  const [checkedStatusList, setCheckedStatusList] = useState<string[]>([]);
  const [checkedScheduleList, setCheckedScheduleList] = useState<number[]>([]);

  const handleWrapperClick = () => {
    onClickOutside();
  };

  const splitArray = (arrayLength: number): number[][] => {
    const array = Array.from({ length: arrayLength }, (_, idx) => idx + 1);
    const result: number[][] = [];

    for (let i = 0; i < array.length; i += 2) {
      result.push(array.slice(i, i + 2));
    }

    return result;
  };

  const scheduleArray = splitArray(totalScheduleCount);

  // 선택된 회차 확인
  const handleScheduleCheck = (schedule: number) => {
    setCheckedScheduleList((prev) =>
      prev.includes(schedule) ? prev.filter((item) => item !== schedule) : [...prev, schedule]
    );
  };

  // 선택된 상태 확인
  const handleStatusCheck = (status: string) => {
    setCheckedStatusList((prev) =>
      prev.includes(status) ? prev.filter((item) => item !== status) : [...prev, status]
    );
  };

  const handleCilckBtn = () => {
    onClickOutside();
  };

  const handleClickRefresh = () => {
    setCheckedScheduleList([]);
    setCheckedStatusList([]);
  };

  return (
    <S.FilterBottomSheetWrapper $isOpen={isOpen} onClick={handleWrapperClick}>
      <BottomSheet isOpen={isOpen}>
        <S.TitleWrapper>
          회차
          <S.RefreshBtn onClick={handleClickRefresh}>
            <S.RefreshIcon />
          </S.RefreshBtn>
        </S.TitleWrapper>

        <S.CheckBoxContainer>
          {scheduleArray.map((row, rowIndex) => (
            <S.CheckBoxRow key={rowIndex}>
              {row.map((scheduleNumber) => (
                <S.CheckBoxLabel key={scheduleNumber}>
                  <S.CheckBox
                    type="checkbox"
                    checked={checkedScheduleList.includes(scheduleNumber)}
                    onChange={() => handleScheduleCheck(scheduleNumber)}
                  />
                  {checkedScheduleList.includes(scheduleNumber) ? (
                    <S.SelectIcon />
                  ) : (
                    <S.UnSelectIcon />
                  )}
                  <S.CheckBoxText>{scheduleNumber}회차</S.CheckBoxText>
                </S.CheckBoxLabel>
              ))}
            </S.CheckBoxRow>
          ))}
        </S.CheckBoxContainer>

        <S.BoxDivider />

        <S.TitleWrapper>입금 상태</S.TitleWrapper>
        <S.CheckBoxContainer>
          <S.CheckBoxRow>
            {bookingStatusList.slice(0, 2).map((status, idx) => (
              <S.CheckBoxLabel key={idx}>
                <S.CheckBox
                  type="checkbox"
                  checked={checkedStatusList.includes(status)}
                  onChange={() => handleStatusCheck(status)}
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
                  onChange={() => handleStatusCheck(status)}
                />
                {checkedStatusList.includes(status) ? <S.SelectIcon /> : <S.UnSelectIcon />}
                <S.CheckBoxText>{status}</S.CheckBoxText>
              </S.CheckBoxLabel>
            ))}
          </S.CheckBoxRow>
        </S.CheckBoxContainer>
        <Spacing marginBottom="3.2" />
        {/* TODO : 선택된 내역 없을 때 버튼 비활성화 하기 */}
        <Button onClick={handleCilckBtn}>적용하기</Button>
      </BottomSheet>
    </S.FilterBottomSheetWrapper>
  );
};

export default FilterBottomSheet;
