import { useState } from "react";
import { useParams } from "react-router-dom";
import posterExImg from "src/pages/MyRegisterdShow/constants/silkagel.png";
import Content from "./components/content/Content";
import ShowInfo from "./components/showInfo/ShowInfo";
import { SHOW_DETAIL_INFO } from "./constants";

const Book = () => {
  // TODO: performanceId로 상세 정보 조회(GET)
  const { performanceId } = useParams<{ performanceId: string }>();
  const [detail, setDetail] = useState(SHOW_DETAIL_INFO);

  return (
    <div>
      <ShowInfo
        posterImage={posterExImg}
        title={detail.performanceTitle}
        price={detail.ticketPrice}
        venue={detail.performanceVenue}
        period={detail.performancePeriod}
        runningTime={detail.runningTime}
        scheduleList={detail.scheduleList}
      />
      <Content
        description={detail.performanceDescription}
        attentionNote={detail.performanceAttentionNote}
        contact={detail.performanceContact}
        teamName={detail.performanceTeamName}
        castList={detail.castList}
      />
    </div>
  );
};

export default Book;
