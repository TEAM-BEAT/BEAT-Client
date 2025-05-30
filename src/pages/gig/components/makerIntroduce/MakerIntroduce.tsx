import defaultImg from "@assets/images/img_staff_medium.png";
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
        {castList.length > 0 ? (
          <S.TeamPeopleCardWrapper>
            {castList.map((cast, i) => (
              <PeopleCard
                key={`${cast.castId}-${i}`}
                photo={cast.castPhoto || defaultImg}
                role={cast.castRole}
                name={cast.castName}
              />
            ))}
          </S.TeamPeopleCardWrapper>
        ) : (
          <S.NoContentBox>등록된 출연진 정보가 없어요.</S.NoContentBox>
        )}
      </S.MakerInfoContainer>

      <S.MakerInfoContainer>
        <S.MakerInfoTitle>스태프</S.MakerInfoTitle>
        {staffList.length > 0 ? (
          <S.TeamPeopleCardWrapper>
            {staffList.map((staff, i) => (
              <PeopleCard
                key={`${staff.staffId}-${i}`}
                photo={staff.staffPhoto || defaultImg}
                role={staff.staffRole}
                name={staff.staffName}
              />
            ))}
          </S.TeamPeopleCardWrapper>
        ) : (
          <S.NoContentBox>등록된 스태프 정보가 없어요.</S.NoContentBox>
        )}
      </S.MakerInfoContainer>
    </S.Wrapper>
  );
};

export default MakerIntroduce;
