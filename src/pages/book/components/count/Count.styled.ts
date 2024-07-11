import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  align-items: flex-end;
  width: 100%;
  padding: 2.4rem 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_800};
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

`;

export const Title = styled.h2`
  margin-bottom: 0.2rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.heading4};
`;

export const Comment = styled.p`
  color: ${({ theme }) => theme.colors.gray_400};
  ${({ theme }) => theme.fonts["caption1-medi"]}
`;

export const PricePrefix = styled.span`
  margin-right: 0.6rem;

  color: ${({ theme }) => theme.colors.gray_100};
  ${({ theme }) => theme.fonts["body1-long"]};
`;

export const TotalPrice = styled.p`
  display: inline;
  ${({ theme }) => theme.fonts.heading4};
`;
