import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMemberBookingList,
  GuestBookingRequest,
  MemberBookingRequest,
  postGuestBook,
  postGuestBookingList,
  postGuestBookingReq,
  postMemberBook,
} from "./api";

export const BOOKING_QUERY_KEY = {
  BOOKING: "booking",
  BOOKING_LIST: "bookingList",
};

// 비회원 예매
export const useGuestBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: GuestBookingRequest) => postGuestBook(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [BOOKING_QUERY_KEY.BOOKING] });
      queryClient.invalidateQueries({ queryKey: [BOOKING_QUERY_KEY.BOOKING_LIST] });
      queryClient.refetchQueries({ queryKey: [BOOKING_QUERY_KEY.BOOKING], exact: true });
      queryClient.refetchQueries({
        queryKey: [BOOKING_QUERY_KEY.BOOKING_LIST],
        exact: true,
      });
    },
  });
};

// 비회원 예매 목록 조회
export const usePostGuestBookingList = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (formData: postGuestBookingReq) => postGuestBookingList(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [BOOKING_QUERY_KEY.BOOKING] });
      queryClient.invalidateQueries({ queryKey: [BOOKING_QUERY_KEY.BOOKING_LIST] });
      queryClient.refetchQueries({ queryKey: [BOOKING_QUERY_KEY.BOOKING], exact: true });
      queryClient.refetchQueries({
        queryKey: [BOOKING_QUERY_KEY.BOOKING_LIST],
        exact: true,
      });
    },
  });
};

// 회원 예매 조회
export const useGetMemberBookingList = () => {
  return useQuery({
    queryKey: [BOOKING_QUERY_KEY.BOOKING_LIST],
    queryFn: () => getMemberBookingList(),
    // staleTime: 1000 * 60 * 60,

    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
    enabled: false,
  });
};

// 회원 예매
export const useMemberBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: MemberBookingRequest) => postMemberBook(formData),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [BOOKING_QUERY_KEY.BOOKING] });
      queryClient.invalidateQueries({ queryKey: [BOOKING_QUERY_KEY.BOOKING_LIST] });
      queryClient.refetchQueries({ queryKey: [BOOKING_QUERY_KEY.BOOKING], exact: true });
      queryClient.refetchQueries({
        queryKey: [BOOKING_QUERY_KEY.BOOKING_LIST],
        exact: true,
      });
    },
  });
};
