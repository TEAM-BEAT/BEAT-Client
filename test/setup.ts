import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

// 각 테스트 후에 자동으로 cleanup을 실행
afterEach(() => {
  cleanup();
});

// window.matchMedia 모킹
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// ResizeObserver 모킹
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

window.ResizeObserver = ResizeObserverMock;

// lottie-web 모킹
vi.mock("lottie-web", () => {
  return {
    default: {
      loadAnimation: vi.fn(() => ({
        destroy: vi.fn(),
        pause: vi.fn(),
        play: vi.fn(),
        stop: vi.fn(),
      })),
      setQuality: vi.fn(),
      registerAnimation: vi.fn(),
      setSpeed: vi.fn(),
    },
  };
});

// lottie-react 모킹
vi.mock("lottie-react", () => {
  const MockLottie = () => {
    return { type: "div", props: { "data-testid": "lottie-animation" } };
  };
  return {
    default: MockLottie,
  };
});
