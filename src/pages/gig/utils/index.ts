import dayjs from "dayjs";

export const formatRoundDate = (_date: string): string => {
  const date = dayjs(_date);
  const day = date.date();
  const time = date.format("HH:mm");

  return `${day}일 / ${time}`;
};
