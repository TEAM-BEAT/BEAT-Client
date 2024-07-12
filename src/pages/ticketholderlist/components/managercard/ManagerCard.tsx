import { Dispatch, SetStateAction } from "react";
import * as S from "./ManagerCard.styled";

const ManagerCard = ({
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
  const handlePaymentToggle = () => {
    setPaid((arr) =>
      arr.map((item) =>
        item.bookingId === bookingId
          ? { ...item, isPaymentCompleted: !item.isPaymentCompleted }
          : item
      )
    );
  };
  return (
    <S.ManagerCardWrapper $isDetail={isDetail}>
      {isDeleteMode && <S.DeleteSelectedIcon />}
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
        <S.ManagerCardRadioBox onClick={handlePaymentToggle}>
          {isPaid ? <S.SelectedIcon /> : <S.UnselectedIcon />}
          <S.ManagerCardRadioText>{isPaid ? "입금 완료" : "미입금"}</S.ManagerCardRadioText>
        </S.ManagerCardRadioBox>
      </S.ManagerCardRadioLayout>
    </S.ManagerCardWrapper>
  );
};

export default ManagerCard;
