export const convertingScheduleNumber = (_scheduleNumber: number): string => {
  switch (_scheduleNumber) {
    case 1:
      return "FIRST";
    case 2:
      return "SECOND";
    case 3:
      return "THIRD";
    case 4:
      return "FOURTH";
    case 5:
      return "FIFTH";
    case 6:
      return "SIXTH";
    case 7:
      return "SEVENTH";
    case 8:
      return "EIGHTH";
    case 9:
      return "NINTH";
    case 10:
      return "TENTH";
    default:
      return "UNKNOWN";
  }
};
