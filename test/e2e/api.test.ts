import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";
import axios from "axios";

// 테스트 시작 전에 서버 시작
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// 각 테스트 후에 핸들러 초기화
afterEach(() => server.resetHandlers());

// 모든 테스트 후에 서버 종료
afterAll(() => server.close());

describe("API E2E Tests", () => {
    it("fetches performance list from mocked API", async () => {
        const response = await axios.get("https://mock-api.example.com/main");

        expect(response.data.success).toBe(true);
        expect(response.data.data.performanceList).toHaveLength(2);
        expect(response.data.data.performanceList[0].performanceTitle).toBe("모킹된 공연 1");
        expect(response.data.data.performanceList[1].performanceTitle).toBe("모킹된 공연 2");
    });

    it("handles login with correct authorization code", async () => {
        const response = await axios.get("https://mock-api.example.com/auth?code=valid-auth-code");

        expect(response.data.success).toBe(true);
        expect(response.data.data.accessToken).toBe("mock-access-token");
        expect(response.data.data.refreshToken).toBe("mock-refresh-token");
        expect(response.data.data.isNew).toBe(false);
    });

    it("fetches user information from mocked API", async () => {
        const response = await axios.get("https://mock-api.example.com/user");

        expect(response.data.success).toBe(true);
        expect(response.data.data.userId).toBe(1);
        expect(response.data.data.name).toBe("테스트 사용자");
        expect(response.data.data.email).toBe("test@example.com");
    });
});
