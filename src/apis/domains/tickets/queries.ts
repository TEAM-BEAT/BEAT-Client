import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getTicketReq,
  getTicketRetrieve,
  getTicketRetrieveSearch,
  putTicketDelete,
  putTicketRefund,
  putTicketUpdate,
  TicketDeleteRequest,
  TicketRefundRequest,
  TicketUpdateRequest,
} from "./api";

// 예매자 목록 조회 API (GET)를 위한 쿼리 작성
const QUERY_KEY = {
  SELLER_BOOKING_LIST: "sellerBookingList",
};

export const useTicketRetrive = (formData: getTicketReq, filterList) => {
  return useQuery({
    queryKey: [QUERY_KEY.SELLER_BOOKING_LIST],
    queryFn: () => getTicketRetrieve(formData, filterList),
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 예매자 목록 검색 API (GET)를 위한 쿼리 작성

export const useTicketRetriveSearch = (formData: getTicketReq, searchWord, filterList) => {
  return useQuery({
    queryKey: [QUERY_KEY.SELLER_BOOKING_LIST],
    queryFn: () => getTicketRetrieveSearch(formData, searchWord, filterList),
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 예매자 입급 여부 수정 API (PUT)를 위한 쿼리 작성
export const useTicketUpdate = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (formData: TicketUpdateRequest) => putTicketUpdate(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SELLER_BOOKING_LIST] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.SELLER_BOOKING_LIST] });
    },
  });
};

// 예매자 환불 여부 수정 API (PUT)를 위한 쿼리 작성
export const useTicketRefund = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (formData: TicketRefundRequest) => putTicketRefund(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SELLER_BOOKING_LIST] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.SELLER_BOOKING_LIST] });
    },
  });
};

// 예매자 삭제 여부 수정 API (PUT)를 위한 쿼리 작성
export const useTicketDelete = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (formData: TicketDeleteRequest) => putTicketDelete(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SELLER_BOOKING_LIST] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.SELLER_BOOKING_LIST] });
    },
  });
};
