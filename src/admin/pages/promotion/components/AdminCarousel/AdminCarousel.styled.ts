import styled from "styled-components";

export const AdminCarouselWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Notification = styled.div`
  display: flex;

  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-long"]};
`;

export const CarouselContainer = styled.section`
  display: flex;
  gap: 2.4rem;
  width: 111.2rem;
  margin-top: 3.2rem;
  overflow-x: scroll;
`;
