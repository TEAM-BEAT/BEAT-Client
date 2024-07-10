import Spacing from "@components/commons/spacing/Spacing";
import * as S from "./Info.styled";

interface InfoProps {
  genre: string;
  title: string;
  teamName: string;
  venue: string;
  period: string;
}

const Info = ({ genre, title, teamName, venue, period }: InfoProps) => {
  return (
    <S.InfoContainer>
      <S.InfoTop>
        <S.InfoPoster $imgsrc={"src/pages/MyRegisterdShow/constants/silkagel.png"} />

        <S.InfoTextBox>
          <S.InfoType>{genre}</S.InfoType>
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
        {/* TODO: 변경 */}
        {/* <IconText icon={<IcOutlinePlace />} text={venue} /> */}
        <span>{venue}</span>
        {/* <IconText icon={<IconTime />} text={period} /> */}
        <span>{period}</span>
      </S.InfoBottom>
    </S.InfoContainer>
  );
};

export default Info;
