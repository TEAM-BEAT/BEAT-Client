export interface LookupProps {
  createdAt: string;
  performanceDate: string;
  performanceTitle: string;
  scheduleNumber: string;
  performanceVenue: string;
  purchaseTicketCount: number;
  paymentStatus: boolean;
  accountNumber: string;
  handleBtn?: () => void;
  handleAccount?: () => void;
}
