import { DeleteFormDataProps } from "@typings/deleteBookerFormatProps";
import { Dispatch, SetStateAction } from "react";
import SelectIcon from "../selectIcon/SelectIcon";
import * as S from "./ManagerCard.styled";

const ManagerCard = ({
  formData,
  setFormData,
  isDeleteMode,
  bookingId,
  isPaid,
  isDetail,
  setPaid,
  bookername,
  purchaseTicketeCount,
  bookerPhoneNumber,
  createAt,
  editBlock,
  isPaymentCompleted,
  payment,
  scheduleNumber,
  schedule,
}: {
  formData: DeleteFormDataProps;
  setFormData: Dispatch<SetStateAction<DeleteFormDataProps>>;
  isDeleteMode: boolean;
  bookingId: number;
  isPaid: boolean;
  isDetail: boolean;
  setPaid: () => void;
  bookername: string;
  purchaseTicketeCount: number;
  bookerPhoneNumber: string;
  createAt: string;
  editBlock: boolean;
  isPaymentCompleted: boolean;
  payment: boolean;
  scheduleNumber: string;
  schedule: number;
}) => {
  //체크박스를 누를 시에, 현재 카드의 bookingId를 인자로 받아 해당 bookingId를 delete 요청을 보낼 formData에 포함시킴.
  //만약 체크해제를 할 경우 삭제할 목록에 포함되어 있던 해당 bookingId를 삭제하는 로직 구현
  //사용하기 위해서는 한번 더 감싸야 함.
  const handleCheckBox = (managerBookingId: number) => {
    setFormData((prevFormData) => {
      const isAlreadyChecked = prevFormData.bookingList.some(
        (obj) => obj.bookingId === managerBookingId
      );
      const updateBookingList = isAlreadyChecked
        ? prevFormData.bookingList.filter((obj) => obj.bookingId !== managerBookingId)
        : [...prevFormData.bookingList, { bookingId: managerBookingId }];
      return { ...prevFormData, bookingList: updateBookingList };
    });
  };
  const isScheduleMatched =
    schedule === 0 ||
    (scheduleNumber === "FIRST" && schedule === 1) ||
    (scheduleNumber === "SECOND" && schedule === 2) ||
    (scheduleNumber === "THIRD" && schedule === 3);
  const isPaymentMatched = payment === undefined || isPaymentCompleted === payment;
  const isRendered: boolean = isScheduleMatched && isPaymentMatched;

  const date = createAt.split("T")[0];
  const formattedDate = date.replace(/-/g, ".");
  const convertingNumber = (scheduleNumberrr: string) => {
    switch (scheduleNumberrr) {
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

  const nothingTodo = () => {};

  return (
    isRendered && (
      <S.ManagerCardWrapper $isDetail={isDetail}>
        {isDeleteMode && (
          <SelectIcon
            onClick={() => handleCheckBox(bookingId)}
            isChecked={formData.bookingList.some((obj) => obj.bookingId === bookingId)}
          />
        )}
        <S.ManagerCardLayout $isDeleteMode={isDeleteMode} $isDetail={isDetail}>
          <S.ManagerCardBox>
            <S.ManagerCardTextBox>
              <S.ManagerCardTextTitle>이름</S.ManagerCardTextTitle>
              <S.ManagerCardTextContent>{bookername}</S.ManagerCardTextContent>
            </S.ManagerCardTextBox>
            <S.ManagerCardTextBox>
              <S.ManagerCardTextTitle>매수</S.ManagerCardTextTitle>
              <S.ManagerCardTextContent>{`${purchaseTicketeCount}매`}</S.ManagerCardTextContent>
            </S.ManagerCardTextBox>
            {
              <S.ManagerCardDetailBox $isDetail={isDetail}>
                <S.ManagerCardTextBox>
                  <S.ManagerCardTextTitle>회차</S.ManagerCardTextTitle>
                  <S.ManagerCardTextContent>{`${convertingNumber(scheduleNumber)}회차`}</S.ManagerCardTextContent>
                </S.ManagerCardTextBox>
                <S.ManagerCardTextBox>
                  <S.ManagerCardTextTitle>연락처</S.ManagerCardTextTitle>
                  <S.ManagerCardTextContent>{bookerPhoneNumber}</S.ManagerCardTextContent>
                </S.ManagerCardTextBox>
                <S.ManagerCardTextBox>
                  <S.ManagerCardTextTitle>예매일</S.ManagerCardTextTitle>
                  <S.ManagerCardTextContent>{formattedDate}</S.ManagerCardTextContent>
                </S.ManagerCardTextBox>
              </S.ManagerCardDetailBox>
            }
          </S.ManagerCardBox>
        </S.ManagerCardLayout>
        <S.ManagerCardRadioLayout $isDetail={isDetail} $isPaid={isPaid}>
          <S.ManagerCardRadioBox
            $isDeleteMode={isDeleteMode}
            $editBlock={editBlock}
            onClick={editBlock ? nothingTodo : setPaid}
          >
            {isDeleteMode ? <></> : isPaid ? <S.SelectedIcon /> : <S.UnselectedIcon />}
            <S.ManagerCardRadioText>{isPaid ? "입금 완료" : "미입금"}</S.ManagerCardRadioText>
          </S.ManagerCardRadioBox>
        </S.ManagerCardRadioLayout>
      </S.ManagerCardWrapper>
    )
  );
};

export default ManagerCard;
