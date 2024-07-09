import styled from "styled-components";

export const ShowTypeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
`;

export const ShowTypeIcon = styled.span`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.4rem;

  background-color: ${({ theme }) => theme.colors.gray_500};
`;

export const ShowTypeText = styled.span`
  ${({ theme }) => theme.fonts["caption2-semi"]};
  color: ${({ theme }) => theme.colors.gray_500};
`;
