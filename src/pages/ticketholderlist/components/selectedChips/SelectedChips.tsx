import React from "react";
import * as S from "./SelectedChips.styled";
import {
  convertingBookingStatus,
  FilterListType,
  PaymentType,
} from "@pages/ticketholderlist/TicketHolderList";

interface SelectedChipsProps {
  filterList: FilterListType[];
  handleFilter: (scheduleNumber: number[], bookingStatus: string[]) => void;
}

const SelectedChips = ({ filterList, handleFilter }: SelectedChipsProps) => {
  const handleClickDelete = (scheduleNumberToDelete: number, bookingStatusToDelete: string) => {
    const updatedScheduleNumbers = filterList.scheduleNumber
      .filter((item) => item !== scheduleNumberToDelete)
      .map((item) => item);

    const updatedBookingStatuses = filterList.bookingStatus
      .filter((item) => item !== bookingStatusToDelete)
      .map((item) => item);

    handleFilter(updatedScheduleNumbers, updatedBookingStatuses);
  };

  return (
    <S.SelectedChipsWrapper>
      {filterList.scheduleNumber.map((filter, index) => (
        <S.Chip key={index}>
          {filter}회차 {/* scheduleNumber 사용 */}
          <S.DeleteIcon onClick={() => handleClickDelete(filter, "")} />
        </S.Chip>
      ))}
      {filterList.bookingStatus.map((filter, index) => (
        <S.Chip key={index}>
          {convertingBookingStatus(filter as PaymentType)}
          <S.DeleteIcon onClick={() => handleClickDelete(0, filter)} />
        </S.Chip>
      ))}
    </S.SelectedChipsWrapper>
  );
};

export default SelectedChips;
