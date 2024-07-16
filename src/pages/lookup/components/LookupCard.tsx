import * as S from "./LookupCard.styled";
import { useNavigate } from "react-router-dom";
import { LookupProps } from "../types/lookupType";
import useModal from "@hooks/useModal";
import BankAccount from "@pages/modalTest/BankAccount";

const LookupCard = ({
  createdAt,
  performanceDate,
  performanceTitle,
  scheduleNumber,
  performanceVenue,
  purchaseTicketCount,
  paymentStatus,
  bankName,
  accountNumber,
  dueDate,
  price,
}: LookupProps) => {
  const navigate = useNavigate();

  const createdAtString = createdAt.slice(0, 10);
  const createDataArray = createdAtString.split("-");

  const performanceDateArray = performanceDate.split("-");
  const totalPrice = (price * purchaseTicketCount).toLocaleString("ko-KR");

  const { openModal } = useModal();

  const handleModal = (bank: string, number: string) => {
    openModal({
      // 예금주랑 가격은 내일 API 명세서 보고 맞추기
      children: (
        <BankAccount
          bankName={bank}
          number={number}
          accountName="전희주"
          accountNumber={accountNumber}
          price={5000}
        />
      ),
    });
  };

  return (
    <S.LookupCardWrapper>
      {/* 제목 선택하면 해당 공연으로 넘어갈 수 있도록!! */}
      <S.LookupTitleWrapper type="button" onClick={() => navigate("/gigs")}>
        <S.LookupTitle>{performanceTitle}</S.LookupTitle>
        <S.TitleArrowRightIcon />
      </S.LookupTitleWrapper>
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
          <S.SubTitle>공연장소</S.SubTitle>
          <S.Text>{performanceVenue}</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>관람회차</S.SubTitle>
          <S.Text>
            {scheduleNumber}회차 {purchaseTicketCount}매
          </S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>총 금액</S.SubTitle>
          <S.Text>{totalPrice}원</S.Text>
        </S.Context>
        <S.Context>
          <S.SubTitle>입금상태</S.SubTitle>
          <S.DepositLayout>
            {paymentStatus ? (
              <S.CheckingDeposit>입금 확인 중</S.CheckingDeposit>
            ) : (
              <S.CheckedDeposit>입금 완료</S.CheckedDeposit>
            )}
            {dueDate >= 0 ? (
              <S.AccountLayout onClick={() => handleModal(bankName, accountNumber)}>
                <S.Account>계좌번호</S.Account>
                <S.ArrowRightIcon />
              </S.AccountLayout>
            ) : (
              <></>
            )}
          </S.DepositLayout>
        </S.Context>
      </S.ContextLayout>
    </S.LookupCardWrapper>
  );
};

export default LookupCard;
