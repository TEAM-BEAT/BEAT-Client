import { IconTime, IcOutlinePlace } from "@assets/svgs";
import { SHOW_TYPE, SHOW_TYPE_KEY, ShowTypes } from "@pages/gig/constants";
import { priceFilter } from "@utils/useInputFilter";

import { formatDate } from "@pages/gig/utils";
import IconText from "../iconText/IconText";
import ShowType from "../showType/ShowType";
import * as S from "./ShowInfo.styled";

export type SchelduleListType = {
  scheduleId: number;
  performanceDate: string;
  scheduleNumber: number;
};

interface ShowInfoProps {
  posterImage: string;
  genre: SHOW_TYPE_KEY;
  title: string;
  price: number | null;
  venue: string;
  period: string;
  runningTime: number | null;
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
  scheduleList,
}: ShowInfoProps) => {
  const getShowTypeText = (key: SHOW_TYPE_KEY): ShowTypes => SHOW_TYPE[key];

  return (
    <S.ShowInfoWrapper>
      <S.Poster $imgsrc={posterImage} />
      <ShowType type={getShowTypeText(genre)} />
      <S.Title>{title}</S.Title>
      <div>
        <S.Price>{priceFilter((price as number).toString())}</S.Price>
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
            {scheduleList.map((schedule, i) => {
              const { day, time } = formatDate(schedule.performanceDate);

              return (
                <S.EpisodeBox key={`schedule-${i}`}>
                  <S.EpisodeText>{i + 1}회차</S.EpisodeText>
                  <S.EpisodeText>{day} /&nbsp;</S.EpisodeText>
                  <S.EpisodeText>{time}</S.EpisodeText>
                </S.EpisodeBox>
              );
            })}
          </S.ScheduleListContainer>
        </S.IconTextTimeContainer>
      </S.PlaceTimeWrapper>
    </S.ShowInfoWrapper>
  );
};

export default ShowInfo;
