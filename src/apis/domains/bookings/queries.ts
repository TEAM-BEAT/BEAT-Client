import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  postGuestBookingList,
  postGuestBook,
  postGuestReq,
  postGuestBookingReq,
  getMemberBookingList,
} from "./api";

export const QUERY_KEY = {
  LIST: "list",
};

// 2. 쿼리 작성
export const useGuestBook = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (formData: postGuestReq) => postGuestBook(formData), // API 요청 함수
    onSuccess: (res) => {
      // 성공 시, 호출
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LIST] });
    },
  });
};

export const usePostGuestBookingList = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: (formData: postGuestBookingReq) => postGuestBookingList(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LIST] });
    },
  });
};

export const useGetMemberBookingList = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LIST],
    queryFn: () => getMemberBookingList(),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
