import { useNavigate } from "react-router-dom";
import * as S from "./Performance.styled";

import Spacing from "@components/commons/spacing/Spacing";
import BannerImg from "../../../../assets/images/banner_basic.png";
import PerformnaceCard from "./PerformnaceCard";

interface PerfonmanceProps {
  performanceId?: number;
  performanceTitle?: string;
  performancePeriod?: string;
  ticketPrice?: number;
  dueDate?: number;
  genre?: string;
  posterImage?: string;
}
interface PerformanceComponentProps {
  genre: string;
  performanceList: PerfonmanceProps[];
}

const Performance = ({ genre, performanceList = [] }: PerformanceComponentProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/gig-register");
  };

  const filteredData =
    genre === "ALL" ? performanceList : performanceList.filter((item) => item.genre === genre);

  const sortData = filteredData
    .filter((item) => item.dueDate! >= 0)
    .sort((a, b) => a.dueDate! - b.dueDate!);

  const data1 = sortData.slice(0, 4);
  const data2 = sortData.slice(4);

  return (
    <S.PerformanceWrapper>
      <S.PerformanceLayout>
        {data1.map((item) => (
          <PerformnaceCard key={item.performanceId} {...item} />
        ))}
      </S.PerformanceLayout>
      <Spacing marginBottom="1.5" />
      {genre === "ALL" ? (
        <S.BannerWrapper onClick={handleNavigate}>
          <S.Banner $image={BannerImg} />
        </S.BannerWrapper>
      ) : (
        <></>
      )}
      <Spacing marginBottom="3.2" />
      <S.PerformanceLayout>
        {data2.map((item) => (
          <PerformnaceCard key={item.performanceId} {...item} />
        ))}
      </S.PerformanceLayout>
      <Spacing marginBottom="1.6" />
    </S.PerformanceWrapper>
  );
};

export default Performance;
