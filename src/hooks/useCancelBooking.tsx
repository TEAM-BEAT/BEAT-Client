import { AxiosError } from "axios";
import { useCancelBook, useRefundBook } from "@apis/domains/bookings/queries";
import { useModal } from "@hooks";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CancelRequestProps {
  bookingId: number;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
}

const isRefundRequest = (requestData: CancelRequestProps) =>
  Boolean(requestData.bankName || requestData.accountNumber || requestData.accountHolder);

export const useCancelBooking = (name?: string, phone?: string, password?: string) => {
  const { openAlert, openConfirm, closeConfirm } = useModal();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname.split("/").pop();

  const cancelMutation = useCancelBook(name, phone, password);
  const refundMutation = useRefundBook(name, phone, password);

  const handleCancelRequest = (
    requestData: CancelRequestProps,
    name?: string,
    phone?: string,
    password?: string
  ) => {
    const shouldRequestRefund = isRefundRequest(requestData);
    const mutation = shouldRequestRefund ? refundMutation : cancelMutation;

    const toastMessage = shouldRequestRefund
      ? "메이커에게 환불을 요청했어요."
      : "예매 취소가 완료됐어요.";

    mutation.mutate(requestData, {
      onSuccess: () => {
        const { bookingDetails, ...restState } = location.state || {};
        if (currentPage !== "lookup") {
          navigate("/lookup", { state: { ...restState, toastMessage } });
        } else {
          setToastMessage(toastMessage);
          setTimeout(() => setToastMessage(null), 2000);
        }
      },
      onError: (error: AxiosError<{ message: string }>) => {
        console.error("error", error);
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
    const shouldRequestRefund = isRefundRequest(requestData);

    openConfirm({
      title: shouldRequestRefund ? "환불을 요청할까요?" : "예매를 취소할까요?",
      subTitle: shouldRequestRefund
        ? "관리자가 확인한 후 환불을 진행해요."
        : "예매가 바로 취소되고 좌석이 반환돼요.",
      okText: shouldRequestRefund ? "환불 요청" : "예매 취소",
      okCallback: () => {
        handleCancelRequest(requestData, name, phone, password);
      },
      noText: "돌아가기",
      noCallback: closeConfirm,
    });
  };

  return { confirmCancelAction, toastMessage, setToastMessage };
};
