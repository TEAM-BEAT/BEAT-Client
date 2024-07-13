import * as S from "./ManagerCard.styled";

const ManagerCard = ({
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
  bookingId: number;
  isPaid: boolean;
  isDetail: boolean;
  setPaid: () => void;
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

  return (
    <S.ManagerCardWrapper $isDetail={isDetail}>
      <S.ManagerCardLayout $isDetail={isDetail}>
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
        <S.ManagerCardRadioBox onClick={setPaid}>
          {isPaid ? <S.SelectedIcon /> : <S.UnselectedIcon />}
          <S.ManagerCardRadioText>{isPaid ? "입금 완료" : "미입금"}</S.ManagerCardRadioText>
        </S.ManagerCardRadioBox>
      </S.ManagerCardRadioLayout>
    </S.ManagerCardWrapper>
  );
};

export default ManagerCard;
