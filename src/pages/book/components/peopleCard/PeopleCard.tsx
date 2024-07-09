import styled from "styled-components";

interface PeopleCardProps {
  photo: string;
  role: string;
  name: string;
}

const PeopleCard = ({ photo, role, name }: PeopleCardProps) => {
  return (
    <PeopleCardContainer>
      <PeopleCardPhoto $imgsrc={photo} />
      <PeopleCardTextBox>
        <PeopleCardRole>{role}</PeopleCardRole>
        <PeopleCardName>{name}</PeopleCardName>
      </PeopleCardTextBox>
    </PeopleCardContainer>
  );
};

export default PeopleCard;

export const PeopleCardContainer = styled.article`
  display: flex;
  flex-direction: column;
`;

export const PeopleCardPhoto = styled.img<{ $imgsrc: string }>`
  width: 15.7rem;
  height: 14rem;
  margin-bottom: 0.7rem;

  background-image: url(${({ $imgsrc }) => $imgsrc});
  background-size: 100% 100%;
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
