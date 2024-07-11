import * as S from "./Performance.styled";
import { useNavigate } from "react-router-dom";

import Spacing from "@components/commons/spacing/Spacing";

import { dummyData } from "./dummyData";

const Performance = ({ genre }: { genre: string }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/register");
  };

  // 이 위치에 API로 불러온 배열 넣기
  const data = dummyData.performanceList;

  const filteredData = genre === "ALL" ? data : data.filter((item) => item.genre === genre);

  const sortData = filteredData
    .filter((item) => item.dueDate >= 1)
    .sort((a, b) => a.dueDate - b.dueDate);

  const data1 = sortData.slice(0, 4);
  const data2 = sortData.slice(4);

  return (
    <S.PerformanceWrapper>
      <S.PerformanceLayout>
        {data1.map((item) => (
          <S.PerformanceCardWrapper key={item.performanceId}>
            <S.PerformanceImg />
            {item.dueDate <= 5 ? (
              <>
                <S.SubtractBox></S.SubtractBox>
                <S.DueDate>D-{item.dueDate}</S.DueDate>
              </>
            ) : null}
            <S.PerformanceTitleWrapper>
              <S.PerformanceTitle>{item.performanceTitle}</S.PerformanceTitle>
              <S.PerformancePeriod>{item.performancePeriod}</S.PerformancePeriod>
              <S.PerformancePrice>{item.ticketPrice.toLocaleString("en-US")}원</S.PerformancePrice>
            </S.PerformanceTitleWrapper>
          </S.PerformanceCardWrapper>
        ))}
      </S.PerformanceLayout>
      <Spacing marginBottom="1.5" />
      <S.BannerWrapper onClick={handleNavigate}>
        <S.Banner />
      </S.BannerWrapper>
      <Spacing marginBottom="3.2" />
      <S.PerformanceLayout>
        {data2.map((item) => (
          <S.PerformanceCardWrapper key={item.performanceId}>
            <S.PerformanceImg />
            {item.dueDate <= 5 ? (
              <>
                <S.SubtractBox></S.SubtractBox>
                <S.DueDate>D-{item.dueDate}</S.DueDate>
              </>
            ) : null}
            <S.PerformanceTitleWrapper>
              <S.PerformanceTitle>{item.performanceTitle}</S.PerformanceTitle>
              <S.PerformancePeriod>{item.performancePeriod}</S.PerformancePeriod>
              <S.PerformancePrice>{item.ticketPrice.toLocaleString("en-US")}원</S.PerformancePrice>
            </S.PerformanceTitleWrapper>
          </S.PerformanceCardWrapper>
        ))}
      </S.PerformanceLayout>
      <Spacing marginBottom="1.6" />
    </S.PerformanceWrapper>
  );
};

export default Performance;
