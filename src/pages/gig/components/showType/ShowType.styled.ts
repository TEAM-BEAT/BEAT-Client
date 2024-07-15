import styled from "styled-components";

export const ShowTypeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
`;

export const ShowTypeIcon = styled.span`
  width: 1.6rem;
  height: 1.6rem;

  color: ${({ theme }) => theme.colors.gray_500};
`;

export const ShowTypeText = styled.span`
  margin-left: 0.4rem;

  ${({ theme }) => theme.fonts["caption2-semi"]};
  color: ${({ theme }) => theme.colors.gray_500};
`;
