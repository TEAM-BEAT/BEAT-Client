import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts["heading4"]};
  color: ${({ theme }) => theme.colors.gray_400};
`;

export const MakerInfoContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

export const TeamName = styled.p`
  padding: 2rem 1.6rem;

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  color: ${({ theme }) => theme.colors.gray_300};

  background-color: ${({ theme }) => theme.colors.gray_800};
  border-radius: 6px;
`;
