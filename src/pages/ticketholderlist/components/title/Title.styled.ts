import styled from "styled-components";

export const TitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export const PerformanceTeamName = styled.div`
  ${({ theme }) => theme.fonts["caption1-semi"]};
  color: ${({ theme }) => theme.colors.gray_400};
`;

export const PerformanceTitleWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  width: 32.8rem;
`;

// TODO : 말줄임표 작업
export const PerformanceTitle = styled.div`
  display: flex;
  width: 25.8rem;

  ${({ theme }) => theme.fonts.heading2};
  color: ${({ theme }) => theme.colors.white};
`;

export const TicketCountWrapper = styled.section`
  display: flex;
`;

export const PurchaseTicketCount = styled.div`
  ${({ theme }) => theme.fonts["body1-normal-medi"]};
  color: ${({ theme }) => theme.colors.pink_200};
`;

export const TotalTicketCount = styled.div`
  ${({ theme }) => theme.fonts["body1-normal-medi"]};
  color: ${({ theme }) => theme.colors.gray_200};
`;
