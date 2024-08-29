export interface LookupProps {
  userId: number;
  bookingId: number;
  scheduleId: number;
  performanceId: number;
  performanceTitle: string;
  performanceDate: string;
  performanceVenue: string;
  purchaseTicketCount: number;
  scheduleNumber: string;
  bookerName: string;
  bookerPhoneNumber: string;
  bankName: string;
  performanceContact: string;
  accountNumber: string;
  accountHolder: string;
  dueDate: number;
  bookingStatus: string;
  isPaymentCompleted: boolean;
  createdAt: string;
  posterImage: string;
  totalPaymentAmount: number;
  handleBtn?: () => void;
  handleAccount?: () => void;
}
