import { useQueryClient, QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deletePerformance, getMakerPerformance, getPerformanceEdit } from "./api";

const QUERY_KEY = {
  LIST: "list",
};

export const PERFORMANCE_QUERY_KEY = {
  DETAIL: "detail",
  BOOKING_DETAIL: "bookingDetail",
};

// 회원이 등록한 공연 목록을 조회 API (GET) 를 위한 쿼리 작성
export const useMakerPerformance = () => {
  return useQuery({
    queryKey: [PERFORMANCE_QUERY_KEY.DETAIL],
    queryFn: getMakerPerformance,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 공연 수정 페이지 정보 조회 API (GET) 를 위한 쿼리 작성
export const usePerformanceEdit = (performanceId: number) => {
  return useQuery({
    queryKey: [PERFORMANCE_QUERY_KEY.BOOKING_DETAIL, performanceId],
    queryFn: () => getPerformanceEdit(performanceId),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 등록한 공연 삭제
export const usePerformanceDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_performanceId: number) => deletePerformance(_performanceId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [PERFORMANCE_QUERY_KEY.DETAIL] });
      queryClient.invalidateQueries({ queryKey: [PERFORMANCE_QUERY_KEY.BOOKING_DETAIL] });
      queryClient.refetchQueries({ queryKey: [PERFORMANCE_QUERY_KEY.DETAIL], exact: true });
      queryClient.refetchQueries({
        queryKey: [PERFORMANCE_QUERY_KEY.BOOKING_DETAIL],
        exact: true,
      });
    },
  });
};
