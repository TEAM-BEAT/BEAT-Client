import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { PatchFormDataProps } from "@typings/deleteBookerFormatProps";
import {
  getTicketReq,
  getTicketRetrieve,
  putTicketDelete,
  putTicketRefund,
  putTicketUpdate,
  TicketDeleteRequest,
  TicketRefundRequest,
  TicketUpdateRequest,
} from "./api";

import { BOOKING_QUERY_KEY } from "../bookings/queries";

// 예매자 목록 조회 API (GET)를 위한 쿼리 작성
const QUERY_KEY = {
  LIST: "list",
};

export const useTicketRetrive = (formData: getTicketReq, filterList) => {
  return useQuery({
    queryKey: [QUERY_KEY.LIST, BOOKING_QUERY_KEY.BOOKING_LIST],
    queryFn: () => getTicketRetrieve(formData, filterList),
    // staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 예매자 입급 여부 수정 API (PUT)를 위한 쿼리 작성
export const useTicketUpdate = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (formData: TicketUpdateRequest) => putTicketUpdate(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LIST, BOOKING_QUERY_KEY.BOOKING_LIST] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.LIST, BOOKING_QUERY_KEY.BOOKING_LIST] });
    },
  });
};

// 예매자 환불 여부 수정 API (PUT)를 위한 쿼리 작성
export const useTicketRefund = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (formData: TicketRefundRequest) => putTicketRefund(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LIST, BOOKING_QUERY_KEY.BOOKING_LIST] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.LIST, BOOKING_QUERY_KEY.BOOKING_LIST] });
    },
  });
};

// 예매자 삭제 여부 수정 API (PUT)를 위한 쿼리 작성
export const useTicketDelete = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (formData: TicketDeleteRequest) => putTicketDelete(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LIST, BOOKING_QUERY_KEY.BOOKING_LIST] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.LIST, BOOKING_QUERY_KEY.BOOKING_LIST] });
    },
  });
};
