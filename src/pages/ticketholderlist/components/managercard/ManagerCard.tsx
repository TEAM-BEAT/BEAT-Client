import { DeleteFormDataProps } from "@typings/deleteBookerFormatProps";
import { Dispatch, SetStateAction } from "react";
import SelectIcon from "../selectIcon/SelectIcon";
import * as S from "./ManagerCard.styled";

const ManagerCard = ({
  deleteFormData,
  setDeleteFormData,
  isDeleteMode,
  bookingId,
  isPaid,
  setPaid,
  bookername,
  purchaseTicketeCount,
  scheduleNumber,
  bookerPhoneNumber,
  createAt,
}: {
  deleteFormData: DeleteFormDataProps;
  setDeleteFormData: Dispatch<SetStateAction<DeleteFormDataProps>>;
  isDeleteMode: boolean;
  bookingId?: number;
  isPaid?: boolean;
  setPaid: () => void;
  bookername?: string;
  purchaseTicketeCount?: number;
  scheduleNumber?: string;
  bookerPhoneNumber?: string;
  createAt?: string;
}) => {
  //체크박스를 누를 시에, 현재 카드의 bookingId를 인자로 받아 해당 bookingId를 delete 요청을 보낼 formData에 포함시킴.
  //만약 체크해제를 할 경우 삭제할 목록에 포함되어 있던 해당 bookingId를 삭제하는 로직 구현
  //사용하기 위해서는 한번 더 감싸야 함.
  const handleCheckBox = (managerBookingId: number) => {
    setDeleteFormData((prevFormData) => {
      const isAlreadyChecked = prevFormData.bookingList.some(
        (_bookingId) => _bookingId === managerBookingId
      );
      const updateBookingList = isAlreadyChecked
        ? prevFormData.bookingList.filter((_bookingId) => _bookingId !== managerBookingId)
        : [...prevFormData.bookingList, managerBookingId];
      return { ...prevFormData, bookingList: updateBookingList };
    });
  };

  const date = createAt?.split("T")[0];
  const formattedDate = date?.replace(/-/g, ". ");
  const convertingNumber = (_scheduleNumber: string) => {
    switch (_scheduleNumber) {
      case "FIRST":
        return 1;
        break;
      case "SECOND":
        return 2;
        break;
      case "THIRD":
        return 3;
        break;
      default:
        console.log("error");
    }
  };

  return (
    <S.ManagerCardWrapper>
      {isDeleteMode && (
        <SelectIcon
          onClick={() => handleCheckBox(bookingId as number)}
          isChecked={deleteFormData.bookingList.some((_bookingId) => _bookingId === bookingId)}
        />
      )}
      <S.ManagerCardLayout $isDeleteMode={isDeleteMode}>
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
        <S.ManagerCardRadioBox $isDeleteMode={isDeleteMode} onClick={setPaid}>
          <S.ManagerCardRadioText $isPaid={isPaid}>
            {isPaid ? "입금 완료" : "미입금"}
          </S.ManagerCardRadioText>
        </S.ManagerCardRadioBox>
      </S.ManagerCardRadioLayout>
    </S.ManagerCardWrapper>
  );
};

export default ManagerCard;
