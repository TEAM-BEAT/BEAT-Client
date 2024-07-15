import { IconTime, IcOutlinePlace } from "@assets/svgs";
<<<<<<< HEAD
import { priceFilter } from "@utils/useInputFilter";
=======
import { SHOW_TYPE, SHOW_TYPE_KEY, ShowTypes } from "@pages/gig/constants";
>>>>>>> develop
import IconText from "../iconText/IconText";
import ShowType from "../showType/ShowType";
import * as S from "./ShowInfo.styled";

type SchelduleListType = {
  scheduleId: number;
  performanceDate: string;
  scheduleNumber: number;
};

interface ShowInfoProps {
  posterImage: string;
  genre: SHOW_TYPE_KEY;
  title: string;
  price: number;
  venue: string;
  period: string;
  runningTime: number | null;
  genre: string;
  scheduleList: SchelduleListType[];
}

const ShowInfo = ({
  posterImage,
  genre,
  title,
  price,
  venue,
  period,
  runningTime,
  genre,
  scheduleList,
}: ShowInfoProps) => {
<<<<<<< HEAD
  const transformGenreName = (genreee: string): ShowTypes | string => {
    if (genreee === "BAND") {
      return "밴드";
    } else if (genreee === "PLAY") {
      return "연극/뮤지컬";
    } else if (genreee === "DANCE") {
      return "댄스";
    } else if (genreee === "ETC") {
      return "기타";
    }
    return "에러";
  };

  const genreKr = transformGenreName(genre);
=======
  const getShowTypeText = (key: SHOW_TYPE_KEY): ShowTypes => SHOW_TYPE[key];
>>>>>>> develop

  return (
    <S.ShowInfoWrapper>
      <S.Poster $imgsrc={posterImage} />
<<<<<<< HEAD
      <ShowTypes type={genreKr} />
=======
      <ShowType type={getShowTypeText(genre)} />
>>>>>>> develop
      <S.Title>{title}</S.Title>
      <div>
        <S.Price>{priceFilter(price.toString())}</S.Price>
        <S.PriceUnit>원</S.PriceUnit>
      </div>

      <S.PlaceTimeWrapper>
        <IconText icon={<IcOutlinePlace />} text={venue} />
        <S.Divider />
        <S.IconTextTimeContainer>
          <S.IconTextTimeBox>
            <IconText icon={<IconTime />} text={period} />
            <S.RunningTimeText>{runningTime}분</S.RunningTimeText>
          </S.IconTextTimeBox>

          <S.ScheduleListContainer>
            {scheduleList.map((schedule, i) => (
              <S.EpisodeBox key={`schedule-${i}`}>
                <S.EpisodeText>{i + 1}회차</S.EpisodeText>
                {/* TODO: 시간 형식 서버랑 논의하기 */}
                <S.EpisodeText>{schedule.performanceDate}</S.EpisodeText>
              </S.EpisodeBox>
            ))}
          </S.ScheduleListContainer>
        </S.IconTextTimeContainer>
      </S.PlaceTimeWrapper>
    </S.ShowInfoWrapper>
  );
};

export default ShowInfo;
