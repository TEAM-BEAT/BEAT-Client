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
      <S.Title>{teamName}</S.Title>
      <S.MakerInfoContainer>
        <S.MakerInfoTitle>출연진</S.MakerInfoTitle>
        {/* TODO: 출연진 없을 떄 보여줄 컴포넌트 추가 */}
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
          <S.MakerInfoContainer>
            <S.MakerInfoTitle>스태프</S.MakerInfoTitle>
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
