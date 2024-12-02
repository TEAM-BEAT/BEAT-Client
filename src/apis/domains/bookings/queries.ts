import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookingCancelRequest,
  BookingRefundRequest,
  getMemberBookingList,
  GuestBookingRequest,
  MemberBookingRequest,
  patchCancelBook,
  patchRefundBook,
  postGuestBook,
  postGuestBookingList,
  postGuestBookingReq,
  postMemberBook,
} from "./api";

export const BOOKING_QUERY_KEY = {
  MEMBER_BOOKING_LIST: (userId: number) => ["memberBookingList", userId],
  GUEST_BOOKING_LIST: (name: string, phone: string, password: string) => [
    "guestBookingList",
    { name, phone, password },
  ],
};

// 비회원 예매
export const useGuestBook = (name: string, phone: string, password: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: GuestBookingRequest) => postGuestBook(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: BOOKING_QUERY_KEY.GUEST_BOOKING_LIST(name, phone, password),
      });
      queryClient.refetchQueries({
        queryKey: BOOKING_QUERY_KEY.GUEST_BOOKING_LIST(name, phone, password),
        exact: true,
      });
    },
  });
};

// 비회원 예매 목록 조회
export const usePostGuestBookingList = (name: string, phone: string, password: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: postGuestBookingReq) => postGuestBookingList(formData),
    onSuccess: (res) => {
      console.log(
        "Invalidate Query Key:",
        BOOKING_QUERY_KEY.GUEST_BOOKING_LIST(name, phone, password)
      );
      queryClient.invalidateQueries({
        queryKey: BOOKING_QUERY_KEY.GUEST_BOOKING_LIST(name, phone, password),
      });
      queryClient.refetchQueries({
        queryKey: BOOKING_QUERY_KEY.GUEST_BOOKING_LIST(name, phone, password),
        exact: true,
      });
    },
  });
};

// 회원 예매 조회
export const useGetMemberBookingList = () => {
  const userId = Number(localStorage.getItem("user"));
  return useQuery({
    queryKey: BOOKING_QUERY_KEY.MEMBER_BOOKING_LIST(userId),
    queryFn: () => getMemberBookingList(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60 * 24,
    enabled: false,
  });
};

// 회원 예매
export const useMemberBook = () => {
  const userId = Number(localStorage.getItem("user"));
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: MemberBookingRequest) => postMemberBook(formData),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEY.MEMBER_BOOKING_LIST(userId) });
      queryClient.refetchQueries({
        queryKey: BOOKING_QUERY_KEY.MEMBER_BOOKING_LIST(userId),
        exact: true,
      });
    },
  });
};

// 예매 취소
export const useCancelBook = (name?: string, phone?: string, password?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: BookingCancelRequest) => patchCancelBook(formData),

    onSuccess: () => {
      if (name && phone && password) {
        queryClient.invalidateQueries({
          queryKey: BOOKING_QUERY_KEY.GUEST_BOOKING_LIST(name, phone, password),
        });
        queryClient.refetchQueries({
          queryKey: BOOKING_QUERY_KEY.GUEST_BOOKING_LIST(name, phone, password),
          exact: true,
        });
      } else {
        const userId = Number(localStorage.getItem("user"));

        queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEY.MEMBER_BOOKING_LIST(userId) });
        queryClient.refetchQueries({
          queryKey: BOOKING_QUERY_KEY.MEMBER_BOOKING_LIST(userId),
          exact: true,
        });
      }
    },
  });
};

// 예매 환불 신청
export const useRefundBook = (name?: string, phone?: string, password?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: BookingRefundRequest) => patchRefundBook(formData),

    onSuccess: () => {
      if (name && phone && password) {
        queryClient.invalidateQueries({
          queryKey: BOOKING_QUERY_KEY.GUEST_BOOKING_LIST(name, phone, password),
        });
        queryClient.refetchQueries({
          queryKey: BOOKING_QUERY_KEY.GUEST_BOOKING_LIST(name, phone, password),
          exact: true,
        });
      } else {
        const userId = Number(localStorage.getItem("user"));

        queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEY.MEMBER_BOOKING_LIST(userId) });
        queryClient.refetchQueries({
          queryKey: BOOKING_QUERY_KEY.MEMBER_BOOKING_LIST(userId),
          exact: true,
        });
      }
    },
  });
};
