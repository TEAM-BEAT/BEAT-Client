import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render } from "@testing-library/react";

// jsdom CSS 파서가 react-calendar 스타일시트를 파싱하다 깨지므로 CSS import를 무력화한다.
vi.mock("react-calendar/dist/Calendar.css", () => ({}));
vi.mock("../../../src/components/commons/datePicker/calendar.css", () => ({}));

import DatePicker from "../../../src/components/commons/datePicker/DatePicker";

describe("DatePicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 31, 14, 30, 0)); // 2026-08-31
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("오늘 날짜 타일은 비활성(disabled) 상태로 렌더된다", () => {
    const { container } = render(<DatePicker date={undefined} onChangeDate={() => {}} />);

    const todayTile = container.querySelector(".react-calendar__tile--now");
    expect(todayTile).not.toBeNull();
    expect(todayTile).toBeDisabled();
  });

  it("과거 날짜 타일은 비활성(disabled) 상태로 렌더된다", () => {
    const { container } = render(<DatePicker date={undefined} onChangeDate={() => {}} />);

    // 이번 달 첫날(8/1)은 오늘(8/31) 이전이므로 반드시 비활성
    const firstDayTile = container.querySelector(
      ".react-calendar__month-view__days .react-calendar__tile:not(.react-calendar__month-view__days__day--neighboringMonth)"
    );
    expect(firstDayTile).not.toBeNull();
    expect(firstDayTile).toBeDisabled();
  });

  it("과거/오늘 비활성 타일이 최소 1개 이상 존재한다", () => {
    const { container } = render(<DatePicker date={undefined} onChangeDate={() => {}} />);

    const disabledTiles = container.querySelectorAll(
      ".react-calendar__month-view__days .react-calendar__tile[disabled]"
    );
    expect(disabledTiles.length).toBeGreaterThan(0);
  });
});
