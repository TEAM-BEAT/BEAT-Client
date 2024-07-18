import { ScheduleListTypes } from "../components/select/Select";

export const getScheduleNumberById = (
  scheduleList: ScheduleListTypes[],
  scheduleId: number
): string | undefined => {
  const schedule = scheduleList.find((item) => item.scheduleId === scheduleId);

  return schedule ? schedule.scheduleNumber : undefined;
};
