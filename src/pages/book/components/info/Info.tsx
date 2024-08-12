import { IconTime, IcOutlinePlace } from "@assets/svgs";
import Spacing from "@components/commons/spacing/Spacing";
import IconText from "@pages/gig/components/iconText/IconText";
import ShowType from "@pages/gig/components/showType/ShowType";
import { SHOW_TYPE, SHOW_TYPE_KEY, ShowTypes } from "@pages/gig/constants";
import * as S from "./Info.styled";

interface InfoProps {
  genre: SHOW_TYPE_KEY;
  posterImage: string;
  title: string;
  teamName: string;
  venue: string;
  period: string;
}

const Info = ({ genre, title, posterImage, teamName, venue, period }: InfoProps) => {
  const getShowTypeText = (key: SHOW_TYPE_KEY): ShowTypes => SHOW_TYPE[key];

  return (
    <S.InfoContainer>
      <S.InfoTop>
        <S.InfoPoster src={posterImage} />

        <S.InfoTextBox>
          <ShowType type={getShowTypeText(genre)} />
          <Spacing marginBottom="0.2" />
          <S.InfoTitle>{title}</S.InfoTitle>
          <Spacing marginBottom="5.2" />
          <div>
            <S.InfoTeamText>공연진</S.InfoTeamText>
            <S.InfoTeamName>{teamName}</S.InfoTeamName>
          </div>
        </S.InfoTextBox>
      </S.InfoTop>

      <S.InfoBottom>
        <IconText icon={<IcOutlinePlace />} text={venue} />
        <IconText icon={<IconTime />} text={period} />
      </S.InfoBottom>
    </S.InfoContainer>
  );
};

export default Info;
