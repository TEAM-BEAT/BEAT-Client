import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { isSelectableCalendarDate } from "../../../src/components/commons/datePicker/datePicker.utils";

describe("isSelectableCalendarDate", () => {
  beforeEach(() => {
    // 2026-08-31 14:30 로 시스템 시간 고정
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 31, 14, 30, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("오늘 날짜는 선택할 수 없다 (자정으로 표현된 오늘)", () => {
    const today = new Date(2026, 7, 31, 0, 0, 0);
    expect(isSelectableCalendarDate(today)).toBe(false);
  });

  it("오늘 날짜는 시각과 무관하게 선택할 수 없다", () => {
    const todayLater = new Date(2026, 7, 31, 23, 59, 59);
    expect(isSelectableCalendarDate(todayLater)).toBe(false);
  });

  it("과거 날짜는 선택할 수 없다", () => {
    const yesterday = new Date(2026, 7, 30, 0, 0, 0);
    expect(isSelectableCalendarDate(yesterday)).toBe(false);
  });

  it("내일 날짜는 선택할 수 있다", () => {
    const tomorrow = new Date(2026, 8, 1, 0, 0, 0);
    expect(isSelectableCalendarDate(tomorrow)).toBe(true);
  });

  it("먼 미래 날짜는 선택할 수 있다", () => {
    const future = new Date(2026, 11, 25, 0, 0, 0);
    expect(isSelectableCalendarDate(future)).toBe(true);
  });
});
