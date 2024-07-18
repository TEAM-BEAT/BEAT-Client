import dayjs from "dayjs";

export const formatDate = (_date: string) => {
  const date = dayjs(_date);
  const day = date.date();
  const time = date.format("HH:mm");

  return { day: `${day}일`, time: `${time}` };
};
