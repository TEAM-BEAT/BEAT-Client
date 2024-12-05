import { convertingBookingStatus } from "@pages/ticketholderlist/TicketHolderList";
import * as S from "./ManageCardContainer.styled";
import { PaymentType } from "@pages/ticketholderlist/TicketHolderList";

interface ManagerCardContainerProps {
  name: string;
  phoneNumber: string;
  ticketCount: number;
  scheduleId: number;
  date: string;
  status: string;
}

export default function ManageCardContainer({
  name,
  phoneNumber,
  ticketCount,
  scheduleId,
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
            {scheduleId}회차 / {ticketCount}매
          </S.InfoText>
          <S.DateText $status={status}>{date}</S.DateText>
        </S.TextContainer>
      </S.InfoBox>
      <S.StatusBox $status={status}>{status}</S.StatusBox>
    </S.ManageCardWrapper>
  );
}
