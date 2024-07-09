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
  gap: 1.6rem;
`;

export const TeamPeopleCardWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.3rem 2rem;
`;
