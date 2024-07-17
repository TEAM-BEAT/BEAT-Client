import { useQuery } from "@tanstack/react-query";
import { getMakerPerformance } from "./api";

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
