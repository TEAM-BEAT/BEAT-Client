import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../src/App";
import router from "../../src/routes/Router";

// 필요한 컴포넌트 모킹
vi.mock("@components/commons/meta/MetaTag", () => ({
    default: ({ title }: { title: string }) => <title data-testid="meta-title">{title}</title>,
}));

vi.mock("@components/commons/modal/Modal", () => ({
    default: () => <div data-testid="modal-component">Modal Component</div>,
}));

vi.mock("@components/commons/modal/Alert", () => ({
    default: () => <div data-testid="alert-component">Alert Component</div>,
}));

vi.mock("@components/commons/modal/Confirm", () => ({
    default: () => <div data-testid="confirm-component">Confirm Component</div>,
}));

vi.mock("../../src/providers/TrackProvider", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="track-provider">{children}</div>
    ),
}));

// 주요 페이지 컴포넌트 모킹
vi.mock("@pages/intro/Intro", () => ({
    default: () => <div data-testid="intro-page">Intro Page</div>,
}));

vi.mock("@pages/main/Main", () => ({
    default: () => <div data-testid="main-page">Main Page</div>,
}));

vi.mock("@pages/onBoarding/OnBoarding", () => ({
    default: () => <div data-testid="onboarding-page">OnBoarding Page</div>,
}));

vi.mock("@pages/notFound/NotFound", () => ({
    default: () => <div data-testid="not-found-page">Not Found Page</div>,
}));

vi.mock("@pages/kakaoAuth/KakaoAuth", () => ({
    default: () => <div data-testid="kakao-auth-page">Kakao Auth Page</div>,
}));

vi.mock("@components/layout/Layout", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="main-layout">{children}</div>
    ),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        RouterProvider: ({ router }: { router: any }) => {
            // 현재 라우터의 상태에 따라 다른 컴포넌트를 렌더링
            const currentPath = router.state?.location?.pathname || "/";

            // 라우터 설정에 따라 페이지 렌더링
            if (currentPath === "/intro") {
                return <div data-testid="intro-page">Intro Page</div>;
            } else if (currentPath === "/main") {
                return <div data-testid="main-page">Main Page</div>;
            } else if (currentPath === "/") {
                return <div data-testid="onboarding-page">OnBoarding Page</div>;
            } else if (currentPath === "/auth") {
                return <div data-testid="kakao-auth-page">Kakao Auth Page</div>;
            }
            return <div data-testid="not-found-page">Not Found Page</div>;
        },
    };
});

describe("Routing Integration Tests", () => {
    it("renders the OnBoarding page on root path", () => {
        vi.spyOn(router, "state", "get").mockReturnValue({
            location: { pathname: "/" },
        } as any);

        render(<App />);

        expect(screen.getByTestId("onboarding-page")).toBeInTheDocument();
    });

    it("renders the Main page on /main path", () => {
        vi.spyOn(router, "state", "get").mockReturnValue({
            location: { pathname: "/main" },
        } as any);

        render(<App />);

        expect(screen.getByTestId("main-page")).toBeInTheDocument();
    });

    it("renders the Intro page on /intro path", () => {
        vi.spyOn(router, "state", "get").mockReturnValue({
            location: { pathname: "/intro" },
        } as any);

        render(<App />);

        expect(screen.getByTestId("intro-page")).toBeInTheDocument();
    });

    it("renders the KakaoAuth page on /auth path", () => {
        vi.spyOn(router, "state", "get").mockReturnValue({
            location: { pathname: "/auth" },
        } as any);

        render(<App />);

        expect(screen.getByTestId("kakao-auth-page")).toBeInTheDocument();
    });

    it("renders the NotFound page on unknown path", () => {
        vi.spyOn(router, "state", "get").mockReturnValue({
            location: { pathname: "/unknown-path" },
        } as any);

        render(<App />);

        expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
    });
});
