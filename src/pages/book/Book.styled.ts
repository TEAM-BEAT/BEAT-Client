import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2.4rem;
`;

export const Divider = styled.div`
  width: 375px;
  height: 8px;
  margin-top: 1.6rem;

  background: ${({ theme }) => theme.colors.gray_800};
  opacity: 0.6;
  border: 1px s;
`;

export const FooterContainer = styled.div`
  position: sticky;
  bottom: 0;
  padding: 2.4rem;

  background-color: ${({ theme }) => theme.colors.gray_900};
`;
