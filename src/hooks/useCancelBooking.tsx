import { AxiosError } from "axios";
import { useCancelBook } from "@apis/domains/bookings/queries";
import { useModal } from "@hooks";

interface CancelRequestProps {
  bookingId: number;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
}

export const useCancelBooking = () => {
  const { openAlert, openConfirm, closeConfirm } = useModal();
  const { mutate } = useCancelBook();

  const handleCancelRequest = (requestData: CancelRequestProps) => {
    mutate(requestData, {
      onError: (error: AxiosError<{ message: string }>) => {
        const errorMessage = error.response?.data?.message || "예매 취소 중 오류가 발생했습니다.";
        openAlert({
          title: "예매 취소 실패",
          subTitle: errorMessage,
          okText: "확인",
        });
      },
    });
  };

  const confirmCancelAction = (requestData: CancelRequestProps) => {
    openConfirm({
      title: "예매를 정말 취소하시겠어요?",
      subTitle: "취소한 예매내역은 복구할 수 없어요.",
      okText: "취소할게요",
      okCallback: () => {
        handleCancelRequest(requestData);
      },
      noText: "아니요",
      noCallback: closeConfirm,
    });
  };

  return { confirmCancelAction };
};
