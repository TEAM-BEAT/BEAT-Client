import { http, HttpResponse } from "msw";

// 모킹할 API 핸들러 정의
export const handlers = [
  // 공연 목록 API 모킹
  http.get("*/main", () => {
    return HttpResponse.json({
      success: true,
      data: {
        performanceList: [
          {
            performanceId: 1,
            performanceTitle: "모킹된 공연 1",
            performancePeriod: "2023-01-01~2025-12-31",
            ticketPrice: 30000,
            dueDate: 3,
            genre: "Rock",
            posterImage: "mock-image1.jpg",
            performanceVenue: "모킹된 공연장 1",
          },
          {
            performanceId: 2,
            performanceTitle: "모킹된 공연 2",
            performancePeriod: "2023-01-01~2025-12-31",
            ticketPrice: 40000,
            dueDate: 5,
            genre: "Jazz",
            posterImage: "mock-image2.jpg",
            performanceVenue: "모킹된 공연장 2",
          },
        ],
      },
    });
  }),

  // 카카오 로그인 API 모킹
  http.get("*/auth", ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (code) {
      return HttpResponse.json({
        success: true,
        data: {
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
          isNew: false,
        },
      });
    }

    return new HttpResponse(null, { status: 400 });
  }),

  // 로그인 사용자 정보 API 모킹
  http.get("*/user", () => {
    return HttpResponse.json({
      success: true,
      data: {
        userId: 1,
        name: "테스트 사용자",
        email: "test@example.com",
        profileImage: "mock-profile.jpg",
      },
    });
  }),
];
