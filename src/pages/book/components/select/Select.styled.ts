import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  width: 100%;
  padding: 2.4rem 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_800};
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.h2`
  margin-bottom: 0.2rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading4};
`;
