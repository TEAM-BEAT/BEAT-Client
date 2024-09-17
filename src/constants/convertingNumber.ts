export const convertingNumber = (_scheduleNumber: string) => {
  switch (_scheduleNumber) {
    case "FIRST":
      return 1;
    case "SECOND":
      return 2;
    case "THIRD":
      return 3;
    case "FOURTH":
      return 4;
    case "FIFTH":
      return 5;
    case "SIXTH":
      return 6;
    case "SEVENTH":
      return 7;
    case "EIGHTH":
      return 8;
    case "NINTH":
      return 9;
    case "TENTH":
      return 10;
    default:
      throw new Error("없는 회차");
  }
};
