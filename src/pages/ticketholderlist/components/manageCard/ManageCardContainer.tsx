import * as S from "./ManageCardContainer.styled";

interface ManagerCardContainerProps {
  name: string;
  phoneNumber: string;
  ticketCount: number;
  scheduleNumber: number;
  date: string;
  status: string;
}

export default function ManageCardContainer({
  name,
  phoneNumber,
  ticketCount,
  scheduleNumber,
  date,
  status,
}: ManagerCardContainerProps) {
  return (
    <S.ManageCardWrapper>
      <S.InfoBox>
        <S.TextContainer>
          <S.InfoText $status={status}>
            {name} ({phoneNumber})
          </S.InfoText>
          <S.InfoText $status={status}>
            {scheduleNumber}회차 / {ticketCount}매
          </S.InfoText>
          <S.DateText $status={status}>{date}</S.DateText>
        </S.TextContainer>
      </S.InfoBox>
      <S.StatusBox $status={status}>{status}</S.StatusBox>
    </S.ManageCardWrapper>
  );
}
