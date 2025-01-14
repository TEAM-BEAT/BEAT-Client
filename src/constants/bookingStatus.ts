export const BOOKING_STATUS = {
  CHECKING_PAYMENT: "CHECKING_PAYMENT",
  BOOKING_CONFIRMED: "BOOKING_CONFIRMED",
  BOOKING_CANCELLED: "BOOKING_CANCELLED",
  BOOKING_DELETED: "BOOKING_DELETED",
  REFUND_REQUESTED: "REFUND_REQUESTED",
} as const;

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const bookingStatusText: Record<BookingStatus, string> = {
  [BOOKING_STATUS.CHECKING_PAYMENT]: "입금 확인 중",
  [BOOKING_STATUS.BOOKING_CONFIRMED]: "입금 완료",
  [BOOKING_STATUS.BOOKING_CANCELLED]: "취소 완료",
  [BOOKING_STATUS.BOOKING_DELETED]: "취소 완료",
  [BOOKING_STATUS.REFUND_REQUESTED]: "환불 요청",
};

export type bookingStatusTypes = keyof typeof bookingStatusText;

export interface DefaultDepositProps {
  $status;
}
