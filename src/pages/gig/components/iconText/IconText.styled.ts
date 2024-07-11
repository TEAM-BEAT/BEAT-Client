import styled from "styled-components";

export const IconTextWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

export const Icon = styled.span`
  width: 2.4rem;
  height: 2.4rem;
`;

export const Text = styled.p`
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  color: ${({ theme }) => theme.colors.gray_100};
`;
