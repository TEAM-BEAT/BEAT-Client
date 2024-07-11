export interface FormData {
  scheduleId: string | undefined;
  selectedValue: number | undefined;
  purchaseTicketCount: number;
  totalPaymentAmount: number;
  bookerName?: string;
  bookerPhoneNumber?: string;
  // 비회원일 경우에만 추가될 속성
  birthDate?: string;
  password?: string;
}
