import { useModal } from "@hooks";
import BankAccount from "@pages/test/modalTest/BankAccount";
import { getBankNameKr } from "@utils/getBankName";
import { useNavigate } from "react-router-dom";
import { LookupProps } from "../types/lookupType";
import * as S from "./LookupCard.styled";

const LookupCard = ({
  createdAt,
  performanceDate,
  performanceTitle,
  performanceId,
  scheduleNumber,
  performanceVenue,
  purchaseTicketCount,
  isPaymentCompleted,
  bankName,
  bookerName,
  accountHolder,
  accountNumber,
  dueDate,
  bookingStatus,
  totalPaymentAmount,
}: LookupProps) => {
  const navigate = useNavigate();

  const scheduleNum = {
    FIRST: "1회차",
    SECOND: "2회차",
    THIRD: "3회차",
  };

  type ScheduleNumTypes = keyof typeof scheduleNum;

  const bookingStatusText = {
    CHECKING_PAYMENT: "입금 확인 예정",
    BOOKING_CONFIRMED: "입금 완료",
    BOOKING_CANCELLED: "예매 취소",
  };
  type bookingStatusTypes = keyof typeof bookingStatusText;

  const createdAtString = createdAt.slice(0, 10);
  const createDataArray = createdAtString.split("-");

  const performanceDateArray = performanceDate.split("-");
  const performanceDataDate = performanceDateArray[2].split("T");

  const { openModal } = useModal();

  const handleModal = (bank: string, number: string) => {
    openModal({
      children: (
        <BankAccount
          bankName={bank}
          number={number}
          accountName={accountHolder}
          accountNumber={accountNumber}
          price={totalPaymentAmount}
        />
      ),
    });
  };

  return (
    <S.LookupCardWrapper>
      <S.LookupTitleWrapper type="button" onClick={() => navigate(`/gig/${performanceId}`)}>
        <S.LookupTitle>{performanceTitle}</S.LookupTitle>
        <S.TitleArrowRightIcon />
      </S.LookupTitleWrapper>
      <S.ContextLayout>
        <S.Context>
          <S.SubTitle>예매일</S.SubTitle>
          <S.Text>
            {createDataArray[0]}년 {createDataArray[1]}월 {createDataArray[2]}일
          </S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>관람일</S.SubTitle>
          <S.Text>
            {performanceDateArray[0]}년 {performanceDateArray[1]}월 {performanceDataDate[0]}일
          </S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>공연장소</S.SubTitle>
          <S.Text>{performanceVenue}</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>관람회차</S.SubTitle>
          <S.Text>
            {scheduleNum[scheduleNumber as ScheduleNumTypes]} {purchaseTicketCount}매
          </S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>총 금액</S.SubTitle>
          <S.Text>{totalPaymentAmount.toLocaleString()}원</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>입금상태</S.SubTitle>
          <S.DepositLayout>
            <S.CheckingDeposit $status={bookingStatus}>
              {bookingStatusText[bookingStatus as bookingStatusTypes]}
            </S.CheckingDeposit>
          </S.DepositLayout>
        </S.Context>
        {dueDate >= 0 && totalPaymentAmount > 0 ? (
          <S.AccountLayout onClick={() => handleModal(getBankNameKr(bankName), accountNumber)}>
            <S.Account>계좌번호</S.Account>
          </S.AccountLayout>
        ) : (
          <></>
        )}
      </S.ContextLayout>
    </S.LookupCardWrapper>
  );
};

export default LookupCard;
