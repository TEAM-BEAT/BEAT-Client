import { IconTime, IcOutlinePlace } from "@assets/svgs";
import IconText from "../iconText/IconText";
import ShowTypes from "../showType/ShowType";
import * as S from "./ShowInfo.styled";

type SchelduleListType = {
  scheduleId: number;
  performanceDate: string;
  scheduleNumber: number;
};

interface ShowInfoProps {
  posterImage: string;
  title: string;
  price: number | null;
  venue: string;
  period: string;
  runningTime: number | null;
  scheduleList: SchelduleListType[];
}

const ShowInfo = ({
  posterImage,
  title,
  price,
  venue,
  period,
  runningTime,
  scheduleList,
}: ShowInfoProps) => {
  return (
    <S.ShowInfoWrapper>
      <S.Poster $imgsrc={posterImage} />
      <ShowTypes type="밴드" />
      <S.Title>{title}</S.Title>
      <div>
        <S.Price>{price}</S.Price>
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
