type PaymentType =
  | "CHECKING_PAYMENT"
  | "BOOKING_CONFIRMED"
  | "BOOKING_CANCELLED"
  | "REFUND_REQUESTED";

export const convertingBookingStatus = (_bookingStatus: PaymentType): string => {
  switch (_bookingStatus) {
    case "CHECKING_PAYMENT":
      return "입금 확인 필요";
    case "BOOKING_CONFIRMED":
      return "예매 확정";
    case "BOOKING_CANCELLED":
      return "취소 완료";
    case "REFUND_REQUESTED":
      return "환불 처리 필요";
    default:
      throw new Error("알 수 없는 상태입니다.");
  }
};
