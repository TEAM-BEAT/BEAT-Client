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
    name,
    phone,
    password,
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
export const useLazyPostGuestBookingList = () => {
  const queryClient = useQueryClient();

  // 쿼리키에 캐싱
  const fetchBookingList = async ({
    name,
    phone,
    password,
    birth,
  }: {
    name: string;
    phone: string;
    password: string;
    birth: string;
  }) => {
    return await queryClient.fetchQuery({
      queryKey: BOOKING_QUERY_KEY.GUEST_BOOKING_LIST(name, phone, password),
      queryFn: () =>
        postGuestBookingList({
          bookerName: name,
          bookerPhoneNumber: phone,
          password,
          birthDate: birth,
        }),
      staleTime: 1000 * 60 * 10,
    });
  };

  // 캐시된 데이터 조회
  const getCachedBookingList = (name: string, phone: string, password: string) => {
    return queryClient.getQueryData(BOOKING_QUERY_KEY.GUEST_BOOKING_LIST(name, phone, password));
  };

  return { fetchBookingList, getCachedBookingList };
};

// 회원 예매 조회
export const useGetMemberBookingList = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.accessToken;
  if (!userId) {
    return { data: null, isLoading: false };
  }
  return useQuery({
    queryKey: BOOKING_QUERY_KEY.MEMBER_BOOKING_LIST(userId),
    queryFn: () => getMemberBookingList(),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 회원 예매
export const useMemberBook = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.accessToken;
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
        const userId = JSON.parse(localStorage.getItem("user"))?.accessToken;

        queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEY.MEMBER_BOOKING_LIST(userId) });
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
        const userId = JSON.parse(localStorage.getItem("user"))?.accessToken;

        queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEY.MEMBER_BOOKING_LIST(userId) });
      }
    },
  });
};
