import dayjs from "dayjs";

export const formatDate = (_date: string) => {
  const date = dayjs(_date);
  const day = date.date();
  const month = date.month() + 1;
  const time = date.format("HH:mm");

  return { day: `${month}월 ${day}일`, time: `${time}` };
};
