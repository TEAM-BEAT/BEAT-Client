import * as S from "./LookupCard.styled";

interface LookupCardProps {
  createdAt: string;
  performanceDate: string;
  performanceTitle: string;
  scheduleNumber: string;
  performanceVenue: string;
  purchaseTicketCount: number;
  paymentStatus: boolean;
  handleAccount: () => void;
}

const LookupCard = ({
  createdAt,
  performanceDate,
  performanceTitle,
  scheduleNumber,
  performanceVenue,
  purchaseTicketCount,
  paymentStatus,
  handleAccount,
}: LookupCardProps) => {
  const createdAtString = createdAt.slice(0, 10);
  const createDataArray = createdAtString.split("-");

  const performanceDateArray = performanceDate.split("-");

  return (
    <S.LookupCardWrapper>
      <S.LookupTitle>{performanceTitle}</S.LookupTitle>
      <S.BoxDivider />
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
            {performanceDateArray[0]}년 {performanceDateArray[1]}월 {performanceDateArray[2]}일
          </S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>관람회차</S.SubTitle>
          <S.Text>{scheduleNumber}회차</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>공연장소</S.SubTitle>
          <S.Text>{performanceVenue}</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>매수</S.SubTitle>
          <S.Text>{purchaseTicketCount}매</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>입금상태</S.SubTitle>
          <S.DepositLayout>
            {paymentStatus ? (
              <S.CheckingDeposit>입금 확인 중</S.CheckingDeposit>
            ) : (
              <S.CheckedDeposit>입금 완료</S.CheckedDeposit>
            )}
            <S.AccountLayout onClick={handleAccount}>
              <S.Account>계좌번호</S.Account>
              <S.ArrowRightIcon />
            </S.AccountLayout>
          </S.DepositLayout>
        </S.Context>
      </S.ContextLayout>
    </S.LookupCardWrapper>
  );
};

export default LookupCard;
