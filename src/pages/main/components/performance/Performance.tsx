import * as S from "./Performance.styled";

import Spacing from "@components/commons/spacing/Spacing";

import { dummyData } from "./dummyData";

const Performance = ({ genre }: { genre: string }) => {
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
            <S.PerformanceTitleWrapper>
              <S.PerformanceTitle>{item.performanceTitle}</S.PerformanceTitle>
              <S.PerformancePeriod>{item.performancePeriod}</S.PerformancePeriod>
              <S.PerformancePrice>{item.ticketPrice.toLocaleString("en-US")}원</S.PerformancePrice>
            </S.PerformanceTitleWrapper>
          </S.PerformanceCardWrapper>
        ))}
      </S.PerformanceLayout>
      <Spacing marginBottom="1.5" />
      {/* 배너 자리!  */}
      <Spacing marginBottom="5.6" />
      <S.PerformanceLayout>
        {data2.map((item) => (
          <S.PerformanceCardWrapper key={item.performanceId}>
            <S.PerformanceImg />
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
