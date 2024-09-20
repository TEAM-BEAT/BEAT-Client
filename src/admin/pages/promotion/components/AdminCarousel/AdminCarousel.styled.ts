import styled from "styled-components";

export const AdminCarouselWrapper = styled.section`
  display: flex;
`;

export const Notification = styled.div`
  display: flex;

  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts["body2-long"]};
`;
