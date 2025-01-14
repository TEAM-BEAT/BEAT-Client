import * as S from "./Title.styled";

interface BookingInfoProps {
  title: string;
  teamName: string;
  totalSolidCount: number;
  totalCount: number;
}

const Title = ({ title, teamName, totalSolidCount, totalCount }: BookingInfoProps) => {
  return (
    <S.TitleWrapper>
      <S.PerformanceTeamName>{teamName}</S.PerformanceTeamName>
      <S.PerformanceTitleWrapper>
        <S.PerformanceTitle>{title}</S.PerformanceTitle>
        <S.TicketCountWrapper>
          {/* TODO : 필터링 받아올 때마다 값 다르게 설정 */}
          <S.PurchaseTicketCount>{totalSolidCount}</S.PurchaseTicketCount>
          <S.TotalTicketCount>/{totalCount}매</S.TotalTicketCount>
        </S.TicketCountWrapper>
      </S.PerformanceTitleWrapper>
    </S.TitleWrapper>
  );
};

export default Title;
