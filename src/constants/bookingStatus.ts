export const bookingStatusText = {
  CHECKING_PAYMENT: "입금 확인 예정",
  BOOKING_CONFIRMED: "입금 완료",
  BOOKING_CANCELLED: "예매 취소",
};

export type bookingStatusTypes = keyof typeof bookingStatusText;
