import styled from "styled-components";

export const PeopleCardContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

export const PeopleCardPhoto = styled.img`
  width: 15.7rem;
  height: calc(15.7rem * 4 / 3);
  margin-bottom: 0.7rem;
  object-fit: cover;
  object-position: center;

  border-radius: 6px;
`;

export const PeopleCardTextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PeopleCardRole = styled.p`
  ${({ theme }) => theme.fonts["body1-normal-semi"]};
  color: ${({ theme }) => theme.colors.white};
`;

export const PeopleCardName = styled.p`
  ${({ theme }) => theme.fonts["body1-normal-medi"]};
  color: ${({ theme }) => theme.colors.gray_600};
`;
