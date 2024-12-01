type PaymentType =
  | "CHECKING_PAYMENT"
  | "BOOKING_CONFIRMED"
  | "BOOKING_CANCELLED"
  | "REFUND_REQUIRED";

export const convertingBookingStatus = (_bookingStatus: PaymentType): string => {
  switch (_bookingStatus) {
    case "CHECKING_PAYMENT":
      return "미입금";
    case "BOOKING_CONFIRMED":
      return "입금 완료";
    case "BOOKING_CANCELLED":
      return "취소 완료";
    case "REFUND_REQUIRED":
      return "환불 요청";
    default:
      throw new Error("알 수 없는 상태입니다.");
  }
};
