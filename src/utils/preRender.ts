import axios from "axios";

// 사전 렌더링 경로 생성
export async function generatePerformanceRoutes() {
  const staticRoutes = ["/", "/main"]; // 정적 경로
  const dynamicRoutes = await fetchPerformanceIds(); // 동적 경로 가져오기

  return staticRoutes.concat(dynamicRoutes);
}

// 공연 ID를 가져오는 API 호출
async function fetchPerformanceIds() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/main`);

    // 응답 데이터에서 performanceId 추출
    const performances = response.data.data.performanceList;
    const validIds = performances.map((performance) => performance.performanceId);

    return validIds.map((id) => `/gig/${id}`);
  } catch (error) {
    console.error("Error fetching performance IDs:", error);
    return [];
  }
}
