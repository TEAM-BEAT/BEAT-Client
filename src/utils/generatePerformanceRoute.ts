import axios from "axios";

interface PerformanceType {
  performanceId: number;
  performanceTitle: string;
  performancePeriod: string;
  ticketPrice: number;
  dueDate: number;
  genre: string;
  posterImage: string;
  performanceVenue: string;
}

// 공연 ID를 가져오는 API 호출
async function fetchPerformanceIds(url: string) {
  try {
    const response = await axios.get(`${url}/main`);

    const performances = response.data.data.performanceList;
    // 현재 날짜 이후의 공연 ID만 필터링
    const nowDate = new Date();
    const validIds = performances
      .filter((performance: PerformanceType) => {
        const performanceDate = new Date(performance.performancePeriod.slice(-10));

        return performanceDate >= nowDate;
      })
      .map((performance: PerformanceType) => `/gig/${performance.performanceId}`);

    return validIds;
  } catch (error) {
    console.error("Error fetching performance IDs:", error);
    return [];
  }
}

// 사전 렌더링 경로 생성
export async function generatePerformanceRoutes(url: string) {
  const staticRoutes = ["/gig/7", "/main"]; // 정적 경로

  const dynamicRoutes = await fetchPerformanceIds(url); // 동적 경로 가져오기

  return staticRoutes.concat(dynamicRoutes);
}
