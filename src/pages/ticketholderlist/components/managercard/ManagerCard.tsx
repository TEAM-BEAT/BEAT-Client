import { PatchFormDataProps } from "@typings/deleteBookerFormatProps";
import { Dispatch, SetStateAction } from "react";
import SelectIcon from "../selectIcon/SelectIcon";
import * as S from "./ManagerCard.styled";

const ManagerCard = ({
  patchFormData,
  setPatchFormData,
  isEditMode,
  bookingId,
  isPaid,
  setPaid,
  bookername,
  purchaseTicketeCount,
  scheduleNumber,
  bookerPhoneNumber,
  createAt,
  alreadyBookingConfirmed,
}: {
  patchFormData: PatchFormDataProps;
  setPatchFormData: Dispatch<SetStateAction<PatchFormDataProps>>;
  isEditMode: boolean;
  bookingId?: number;
  isPaid?: "CHECKING_PAYMENT" | "BOOKING_CONFIRMED" | "BOOKING_CANCELLED";
  setPaid: () => void;
  bookername?: string;
  purchaseTicketeCount?: number;
  scheduleNumber?: string;
  bookerPhoneNumber?: string;
  createAt?: string;
  alreadyBookingConfirmed: boolean;
}) => {
  const handleCheckBox = (managerBookingId: number) => {
    //삭제할 데이터 form에 추가하는 로직
    setPatchFormData((prevFormData) => {
      const isAlreadyChecked = prevFormData.bookingList.some(
        (_bookingId) => _bookingId === managerBookingId
      );

      const updateBookingList = isAlreadyChecked
        ? prevFormData.bookingList.filter((_bookingId) => _bookingId !== managerBookingId)
        : [...prevFormData.bookingList, managerBookingId];
      return { ...prevFormData, bookingList: updateBookingList };
    });

    //입금 여부 변경될 거 추가하는 로직
    setPaid();
  };

  const date = createAt?.split("T")[0];
  const formattedDate = date?.replace(/-/g, ". ");
  const convertingNumber = (_scheduleNumber: string) => {
    switch (_scheduleNumber) {
      case "FIRST":
        return 1;
      case "SECOND":
        return 2;
      case "THIRD":
        return 3;
      case "FOURTH":
        return 4;
      case "FIFTH":
        return 5;
      case "SIXTH":
        return 6;
      case "SEVENTH":
        return 7;
      case "EIGHTH":
        return 8;
      case "NINTH":
        return 9;
      case "TENTH":
        return 10;
      default:
        throw new Error("없는 회차");
    }
  };

  return (
    <S.ManagerCardWrapper>
      {isEditMode && (
        <SelectIcon
          onClick={() => handleCheckBox(bookingId as number)}
          isChecked={patchFormData.bookingList.some((_bookingId) => _bookingId === bookingId)}
          alreadyBookingConfirmed={alreadyBookingConfirmed}
        />
      )}
      <S.ManagerCardLayout $isEditMode={isEditMode}>
        <S.ManagerCardBox>
          <S.ManagerCardTextBox>
            <S.ManagerCardTextContent>{bookername}</S.ManagerCardTextContent>
            <S.ManagerCardTextContent>{`(${bookerPhoneNumber})`}</S.ManagerCardTextContent>
          </S.ManagerCardTextBox>
          <S.ManagerCardTextBox>
            <S.ManagerCardTextContent>{`${convertingNumber(scheduleNumber as string)}회차`}</S.ManagerCardTextContent>
            <S.ManagerCardTextContent>{`/ ${purchaseTicketeCount}매`}</S.ManagerCardTextContent>
          </S.ManagerCardTextBox>
          <S.ManagerCardTextBox>
            <S.ManagerCardTextTitle>{formattedDate}</S.ManagerCardTextTitle>
          </S.ManagerCardTextBox>
        </S.ManagerCardBox>
      </S.ManagerCardLayout>
      <S.ManagerCardRadioLayout>
        <S.ManagerCardRadioBox $isEditMode={isEditMode}>
          <S.ManagerCardRadioText $isPaid={isPaid === "BOOKING_CONFIRMED"}>
            {isPaid === "BOOKING_CONFIRMED"
              ? "입금 완료"
              : isPaid === "CHECKING_PAYMENT"
                ? "미입금"
                : "예매 취소"}
          </S.ManagerCardRadioText>
        </S.ManagerCardRadioBox>
      </S.ManagerCardRadioLayout>
    </S.ManagerCardWrapper>
  );
};

export default ManagerCard;
