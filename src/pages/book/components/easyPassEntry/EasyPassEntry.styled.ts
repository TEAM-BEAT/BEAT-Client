import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  width: 100%;
  padding: 2.4rem 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_800};
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading4};
`;
