type PaymentType =
  | "CHECKING_PAYMENT"
  | "BOOKING_CONFIRMED"
  | "BOOKING_CANCELLED"
  | "REFUND_REQUESTED"
  | "BOOKING_DELETED";

export interface BookingListProps {
  bookingId?: number;
  bookerName?: string;
  bookerPhoneNumber?: string;
  scheduleId?: number;
  purchaseTicketCount?: number;
  createdAt?: string;
  bookingStatus?: PaymentType;
  scheduleNumber?: string;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
}
