import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../src/App";
import { MemoryRouter } from "react-router-dom";

// 라우터와 같은 의존성을 모킹
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        RouterProvider: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
    };
});

vi.mock("../../src/routes/Router", () => ({
    default: {},
}));

// MetaTag 컴포넌트 모킹
vi.mock("@components/commons/meta/MetaTag", () => ({
    default: ({ title }: { title: string }) => <title data-testid="meta-title">{title}</title>,
}));

// 모달 컴포넌트들 모킹
vi.mock("@components/commons/modal/Modal", () => ({
    default: () => <div data-testid="modal-component">Modal Component</div>,
}));

vi.mock("@components/commons/modal/Alert", () => ({
    default: () => <div data-testid="alert-component">Alert Component</div>,
}));

vi.mock("@components/commons/modal/Confirm", () => ({
    default: () => <div data-testid="confirm-component">Confirm Component</div>,
}));

// TrackProvider 모킹
vi.mock("../../src/providers/TrackProvider", () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="track-provider">{children}</div>
    ),
}));

describe("App Component", () => {
    it("renders without crashing", () => {
        render(<App />);

        // 기본 App 구조가 렌더링되는지 테스트
        expect(screen.getByTestId("track-provider")).toBeInTheDocument();
        expect(screen.getByTestId("modal-component")).toBeInTheDocument();
        expect(screen.getByTestId("alert-component")).toBeInTheDocument();
        expect(screen.getByTestId("confirm-component")).toBeInTheDocument();
    });

    it("renders with correct meta title", () => {
        render(<App />);
        expect(screen.getByTestId("meta-title")).toHaveTextContent("BEAT");
    });
});
