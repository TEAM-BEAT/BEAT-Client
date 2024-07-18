import styled from "styled-components";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts["heading4"]};
  color: ${({ theme }) => theme.colors.gray_0};
`;

export const MakerInfoContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const MakerInfoTitle = styled.h2`
  width: 32.7rem;

  color: ${({ theme }) => theme.colors.gray_300};

  ${({ theme }) => theme.fonts["body2-normal-medi"]};
`;

export const TeamPeopleCardWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.3rem;

  row-gap: 2rem;
`;

export const NoContentBox = styled.p`
  padding: 2.6rem 0;

  color: ${({ theme }) => theme.colors.gray_500};
  ${({ theme }) => theme.fonts["body2-normal-medi"]};
  text-align: center;
`;
