export const calculateDueDate = (dueDate: number) => {
  if (dueDate <= 5 && dueDate >= 1) {
    return `D-${dueDate}`;
  } else if (dueDate < 0) {
    return "공연종료";
  } else if (dueDate === 0) {
    return "D-DAY";
  }
};
