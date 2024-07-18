import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deletePerformance, getMakerPerformance, getPerformanceEdit } from "./api";

const QUERY_KEY = {
  LIST: "list",
};

// 회원이 등록한 공연 목록을 조회 API (GET) 를 위한 쿼리 작성
export const useMakerPerformance = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LIST],
    queryFn: getMakerPerformance,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 공연 수정 페이지 정보 조회 API (GET) 를 위한 쿼리 작성
export const usePerformanceEdit = (performanceId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.LIST],
    queryFn: () => getPerformanceEdit(performanceId),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

// 공연 삭제 API (DELETE) 를 위한 쿼리 작성
export const usePerformanceDelete = () => {
  const queryCilent = new QueryClient();
  return useMutation({
    mutationFn: (_performanceId: number) => deletePerformance(_performanceId),
    onSuccess: (res) => {
      queryCilent.invalidateQueries({ queryKey: [QUERY_KEY.LIST] });
    },
  });
};
