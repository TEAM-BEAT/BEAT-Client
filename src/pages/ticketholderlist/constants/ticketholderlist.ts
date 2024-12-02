export interface BookingListProps {
  bookingId?: number;
  bookerName?: string;
  bookerPhoneNumber?: string;
  scheduleId?: number;
  purchaseTicketCount?: number;
  createdAt?: string;
  bookingStatus?:
    | "CHECKING_PAYMENT"
    | "BOOKING_CONFIRMED"
    | "BOOKING_CANCELLED"
    | "REFUND_REQUESTED"
    | "BOOKING_DELETED";
  scheduleNumber?: string;
}

export interface TicketHolderListProps {
  performanceTitle: string;
  isBooking: boolean;
  totalScheduleCount: number;
  bookingList: BookingListProps[];
}

export interface TicketHolderListDataProps {
  data: TicketHolderListProps;
}

export const RESPONSE_TICKETHOLDER = {
  data: {
    performanceTitle: "비트밴드 정기공연",
    isBooking: true,
    totalScheduleCount: 3,
    bookingList: [
      {
        bookingId: 1,
        bookerName: "황혜린",
        bookerPhoneNumber: "010-1234-5678",
        scheduleId: 2, //scheduleId는 테이블의 특성에 따라 존재하는 것
        purchaseTicketCount: 3,
        createdAt: "2024-07-07T12:34:56.789Z",
        isPaymentCompleted: true,
        scheduleNumber: "SECOND",
      },
      {
        bookingId: 2,
        bookerName: "이동훈",
        bookerPhoneNumber: "010-1234-0000",
        scheduleId: 1,
        purchaseTicketCount: 2,
        createdAt: "2024-07-08T12:34:56.789Z",
        isPaymentCompleted: false,
        scheduleNumber: "FIRST",
      },
      {
        bookingId: 3,
        bookerName: "공준혁",
        bookerPhoneNumber: "010-1234-9999",
        scheduleId: 1,
        purchaseTicketCount: 9,
        createdAt: "2024-07-08T12:34:56.789Z",
        isPaymentCompleted: true,
        scheduleNumber: "THIRD",
      },
      {
        bookingId: 4,
        bookerName: "정도영",
        bookerPhoneNumber: "010-1234-0000",
        scheduleId: 3,
        purchaseTicketCount: 4,
        createdAt: "2024-07-11T12:34:56.789Z",
        isPaymentCompleted: false,
        scheduleNumber: "THIRD",
      },
      {
        bookingId: 5,
        bookerName: "김채현",
        bookerPhoneNumber: "010-1234-0000",
        scheduleId: 3,
        purchaseTicketCount: 6,
        createdAt: "2024-07-15T12:34:56.789Z",
        isPaymentCompleted: false,
        scheduleNumber: "THIRD",
      },
      {
        bookingId: 6,
        bookerName: "윤신지",
        bookerPhoneNumber: "010-1234-0000",
        scheduleId: 3,
        purchaseTicketCount: 2,
        createdAt: "2024-07-03T12:34:56.789Z",
        isPaymentCompleted: true,
        scheduleNumber: "THIRD",
      },
      {
        bookingId: 7,
        bookerName: "익명인",
        bookerPhoneNumber: "010-1000-0000",
        scheduleId: 1,
        purchaseTicketCount: 2,
        createdAt: "2024-07-08T12:34:56.789Z",
        isPaymentCompleted: true,
        scheduleNumber: "SECOND",
      },
    ],
  },
};
