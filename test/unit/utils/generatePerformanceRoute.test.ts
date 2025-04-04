import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generatePerformanceRoutes } from "../../../src/utils/generatePerformanceRoute";
import axios from "axios";

// axios 모킹
vi.mock("axios");
const mockedAxios = axios as any;

describe("generatePerformanceRoute Utility", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should generate static and dynamic routes correctly", async () => {
        // 현재 날짜 기준으로 미래 날짜 생성
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 10);
        const futureDateString = futureDate.toISOString().slice(0, 10);

        // API 응답 모킹
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                data: {
                    performanceList: [
                        {
                            performanceId: 123,
                            performanceTitle: "테스트 공연 1",
                            performancePeriod: `2023-01-01~${futureDateString}`,
                            ticketPrice: 30000,
                            dueDate: 3,
                            genre: "Rock",
                            posterImage: "image1.jpg",
                            performanceVenue: "테스트 공연장 1",
                        },
                        {
                            performanceId: 456,
                            performanceTitle: "테스트 공연 2",
                            performancePeriod: `2023-01-01~${futureDateString}`,
                            ticketPrice: 40000,
                            dueDate: 5,
                            genre: "Jazz",
                            posterImage: "image2.jpg",
                            performanceVenue: "테스트 공연장 2",
                        },
                        {
                            performanceId: 789,
                            performanceTitle: "지난 공연",
                            performancePeriod: "2022-01-01~2022-01-10",
                            ticketPrice: 50000,
                            dueDate: 7,
                            genre: "Classic",
                            posterImage: "image3.jpg",
                            performanceVenue: "테스트 공연장 3",
                        },
                    ],
                },
            },
        });

        // 함수 호출
        const routes = await generatePerformanceRoutes("https://api.example.com");

        // axios.get이 한 번 호출됐는지 확인
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith("https://api.example.com/main");

        // 결과 확인 - 정적 경로 2개와 미래 공연 2개에 대한 동적 경로가 있어야 함
        expect(routes).toContain("/gig/7");
        expect(routes).toContain("/main");
        expect(routes).toContain("/gig/123");
        expect(routes).toContain("/gig/456");
        expect(routes).not.toContain("/gig/789"); // 지난 공연은 포함되지 않아야 함
        expect(routes.length).toBe(4);
    });

    it("should return only static routes when API call fails", async () => {
        // API 호출 실패 모킹
        mockedAxios.get.mockRejectedValueOnce(new Error("API error"));

        // 함수 호출
        const routes = await generatePerformanceRoutes("https://api.example.com");

        // 결과 확인 - 정적 경로만 포함되어야 함
        expect(routes).toContain("/gig/7");
        expect(routes).toContain("/main");
        expect(routes.length).toBe(2);
    });
});
