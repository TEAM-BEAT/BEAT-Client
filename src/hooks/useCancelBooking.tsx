import { AxiosError } from "axios";
import { useCancelBook, useRefundBook } from "@apis/domains/bookings/queries";
import { useModal, useToast } from "@hooks";
import { Toast } from "@components/commons";
import { IconCheck } from "@assets/svgs";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CancelRequestProps {
  bookingId: number;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
}

export const useCancelBooking = () => {
  const { openAlert, openConfirm, closeConfirm } = useModal();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname.split("/").pop();

  const handleCancelRequest = (
    requestData: CancelRequestProps,
    name?: string,
    phone?: string,
    password?: string
  ) => {
    const cancelMutation = useCancelBook(name, phone, password);
    const refundMutation = useRefundBook(name, phone, password);

    const mutation =
      requestData.bankName || requestData.accountNumber || requestData.accountHolder
        ? refundMutation
        : cancelMutation;

    mutation.mutate(requestData, {
      onSuccess: () => {
        if (mutation === cancelMutation) {
          navigate("/lookup", { state: { toastMessage: "예매를 취소했습니다." } });
        } else {
          setToastMessage("메이커에게 환불을 요청했어요.");
          setTimeout(() => setToastMessage(null), 2000);
        }
      },
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

  const confirmCancelAction = (
    requestData: CancelRequestProps,
    name?: string,
    phone?: string,
    password?: string
  ) => {
    openConfirm({
      title: "예매를 정말 취소하시겠어요?",
      subTitle: "취소한 예매내역은 복구할 수 없어요.",
      okText: "취소할게요",
      okCallback: () => {
        handleCancelRequest(requestData, name, phone, password);
      },
      noText: "아니요",
      noCallback: closeConfirm,
    });
  };

  return { confirmCancelAction, toastMessage, setToastMessage };
};
