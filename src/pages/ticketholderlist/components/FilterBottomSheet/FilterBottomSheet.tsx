import { useState, ReactNode, useEffect } from "react";
import * as S from "./FilterBottomSheet.styled";
import { BottomSheet, Button, Spacing } from "@components/commons";
import { FilterListType, PaymentType } from "@pages/ticketholderlist/TicketHolderList";
import { convertingBookingStatus } from "@constants/convertingBookingStatus";

interface FilterBottomSheetProps {
  isOpen: boolean;
  totalScheduleCount: number;
  children?: ReactNode;
  onClickOutside?: () => void;
  filterList: FilterListType;
  handleFilter: (scheduleNumber: number[], bookingStatus: string[]) => void;
}

const bookingStatusList = [
  "CHECKING_PAYMENT",
  "BOOKING_CONFIRMED",
  "REFUND_REQUESTED",
  "BOOKING_CANCELLED",
];

const FilterBottomSheet = ({
  isOpen,
  onClickOutside,
  totalScheduleCount,
  handleFilter,
  filterList,
}: FilterBottomSheetProps) => {
  const [checkedStatusList, setCheckedStatusList] = useState<string[]>(filterList.bookingStatus);
  const [checkedScheduleList, setCheckedScheduleList] = useState<number[]>(
    filterList.scheduleNumber
  );

  const handleWrapperClick = () => {
    onClickOutside();
  };

  const scheduleNumberArray = (arrayLength: number): number[] => {
    const array = Array.from({ length: arrayLength }, (_, idx) => idx + 1);

    return array;
  };

  const scheduleArray = scheduleNumberArray(totalScheduleCount);

  useEffect(() => {
    const newScheduleNumbers = filterList.scheduleNumber.map((item) => item);
    const newBookingStatuses = filterList.bookingStatus.map((item) => item);

    setCheckedScheduleList(newScheduleNumbers);
    setCheckedStatusList(newBookingStatuses);
  }, [filterList]);

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

    handleFilter(checkedScheduleList, checkedStatusList);
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
          {scheduleArray.map((scheduleNumber) => (
            <S.CheckBoxLabel key={scheduleNumber}>
              <S.CheckBox
                type="checkbox"
                checked={checkedScheduleList.includes(scheduleNumber)}
                onChange={() => handleScheduleCheck(scheduleNumber)}
              />
              {checkedScheduleList.includes(scheduleNumber) ? <S.SelectIcon /> : <S.UnSelectIcon />}
              <S.CheckBoxText>{scheduleNumber}회차</S.CheckBoxText>
            </S.CheckBoxLabel>
          ))}
        </S.CheckBoxContainer>

        <S.BoxDivider />

        <S.TitleWrapper>입금 상태</S.TitleWrapper>
        <S.CheckBoxContainer>
          {bookingStatusList.map((status) => (
            <S.CheckBoxLabel key={status}>
              <S.CheckBox
                type="checkbox"
                checked={checkedStatusList.includes(status)}
                onChange={() => handleStatusCheck(status)}
              />
              {checkedStatusList.includes(status) ? <S.SelectIcon /> : <S.UnSelectIcon />}
              <S.CheckBoxText>{convertingBookingStatus(status as PaymentType)}</S.CheckBoxText>
            </S.CheckBoxLabel>
          ))}
        </S.CheckBoxContainer>
        <Spacing marginBottom="3.2" />
        {/* TODO : 선택된 내역 없을 때 버튼 비활성화 하기 */}
        <Button onClick={handleCilckBtn}>적용하기</Button>
      </BottomSheet>
    </S.FilterBottomSheetWrapper>
  );
};

export default FilterBottomSheet;
