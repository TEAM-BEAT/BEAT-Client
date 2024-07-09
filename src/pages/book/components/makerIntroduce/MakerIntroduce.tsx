import { CastListType, StaffListType } from "../content/Content";
import PeopleCard from "../peopleCard/PeopleCard";
import * as S from "./MakerIntroduce.styled";

interface MakerIntroduceProps {
  teamName: string;
  castList: CastListType[];
  staffList: StaffListType[];
}

const MakerIntroduce = ({ teamName, castList, staffList }: MakerIntroduceProps) => {
  return (
    <S.Wrapper>
      <S.Title>{teamName}의 출연진</S.Title>
      <S.MakerInfoContainer>
        <S.TeamPeopleCardWrapper>
          {castList.map((cast, i) => (
            <PeopleCard
              key={`${cast.castId}-${i}`}
              photo={cast.castPhoto}
              role={cast.castRole}
              name={cast.castName}
            />
          ))}
        </S.TeamPeopleCardWrapper>
      </S.MakerInfoContainer>

      {staffList.length > 0 && (
        <>
          <S.Title>{teamName}의 스태프</S.Title>
          <S.MakerInfoContainer>
            <S.TeamPeopleCardWrapper>
              {staffList.map((staff, i) => (
                <PeopleCard
                  key={`${staff.staffId}-${i}`}
                  photo={staff.staffPhoto}
                  role={staff.staffRole}
                  name={staff.staffName}
                />
              ))}
            </S.TeamPeopleCardWrapper>
          </S.MakerInfoContainer>
        </>
      )}
    </S.Wrapper>
  );
};

export default MakerIntroduce;
