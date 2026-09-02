import dayjs from "dayjs";

/**
 * 캘린더에서 선택 가능한 날짜인지 판정한다.
 * 오늘과 과거 날짜는 선택 불가, 내일(내일 00:00) 이상만 선택 가능.
 */
export const isSelectableCalendarDate = (date: Date): boolean => {
  const startOfTomorrow = dayjs().add(1, "day").startOf("day");

  return !dayjs(date).isBefore(startOfTomorrow);
};
