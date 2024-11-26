export const changeDateTime = (date: Date, hour?: number, minute?: number, isPM?: boolean) => {
  const formattedDate = date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, "/")
    .replace(/\s/g, "")
    .replace(/\/$/, "");

  if (hour === undefined || minute === undefined || isPM === undefined) {
    return formattedDate;
  }

  const spaces = " ".repeat(6).replace(/ /g, "\u00A0");
  const formattedTime = `${isPM ? "오후" : "오전"} ${hour}시${minute === 0 ? "" : ` ${minute}분`}`;

  return `${formattedDate}${spaces}${formattedTime}`;
};
