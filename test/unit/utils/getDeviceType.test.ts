import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getDeviceType } from "../../../src/utils/getDeviceType";

describe("getDeviceType Utility", () => {
  const originalNavigator = global.navigator;
  const originalWindow = global.window;

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("detects Android device", () => {
    const mockUserAgent =
      "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36";

    vi.stubGlobal("navigator", {
      userAgent: mockUserAgent,
    });

    expect(getDeviceType()).toBe("Android");
  });

  it("detects iOS device", () => {
    const mockUserAgent =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1";

    vi.stubGlobal("navigator", {
      userAgent: mockUserAgent,
    });

    vi.stubGlobal("window", {
      MSStream: undefined,
    });

    expect(getDeviceType()).toBe("iOS");
  });

  it("detects Desktop as default", () => {
    const mockUserAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

    vi.stubGlobal("navigator", {
      userAgent: mockUserAgent,
    });

    expect(getDeviceType()).toBe("Desktop");
  });
});
