import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2.4rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const FooterContainer = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 2;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;
