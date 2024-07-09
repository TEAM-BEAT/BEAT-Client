import { CastListType } from "../content/Content";
import * as S from "./MakerIntroduce.styled";

interface MakerIntroduceProps {
  teamName: string;
  castList: CastListType[];
}

const MakerIntroduce = ({ teamName, castList }: MakerIntroduceProps) => {
  return (
    <S.Wrapper>
      <S.Title>메이커</S.Title>
      <S.MakerInfoContainer>
        <S.TeamName>{teamName}</S.TeamName>
      </S.MakerInfoContainer>
    </S.Wrapper>
  );
};

export default MakerIntroduce;
