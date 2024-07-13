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
  scheduleNumber,
  bookerPhoneNumber,
  createAt,
}: {
  formData: DeleteFormDataProps;
  setFormData: Dispatch<SetStateAction<DeleteFormDataProps>>;
  isDeleteMode: boolean;
  bookingId: number;
  isPaid: boolean;
  isDetail: boolean;
  setPaid: Dispatch<SetStateAction<any[]>>;
  bookername: string;
  purchaseTicketeCount: number;
  scheduleNumber: string;
  bookerPhoneNumber: string;
  createAt: string;
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
  //상위 컴포넌트에서 받아온 set함수와 bookingId를 이용하여 현재 오브젝트(state)의 payment 상태를 바꾸도록 한다.
  const handlePaymentToggle = (isDeleteModeee: boolean) => {
    if (!isDeleteModeee) {
      setPaid((arr) =>
        arr.map((item) =>
          item.bookingId === bookingId
            ? { ...item, isPaymentCompleted: !item.isPaymentCompleted }
            : item
        )
      );
    }
  };
  return (
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
          {isDetail && (
            <>
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
            </>
          )}
        </S.ManagerCardBox>
      </S.ManagerCardLayout>
      <S.ManagerCardRadioLayout $isDetail={isDetail} $isPaid={isPaid}>
        <S.ManagerCardRadioBox
          $isDeleteMode={isDeleteMode}
          onClick={() => handlePaymentToggle(isDeleteMode)}
        >
          {isDeleteMode ? <></> : isPaid ? <S.SelectedIcon /> : <S.UnselectedIcon />}
          <S.ManagerCardRadioText>{isPaid ? "입금 완료" : "미입금"}</S.ManagerCardRadioText>
        </S.ManagerCardRadioBox>
      </S.ManagerCardRadioLayout>
    </S.ManagerCardWrapper>
  );
};

export default ManagerCard;
