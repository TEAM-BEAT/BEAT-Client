import { useQuery } from "@tanstack/react-query";
import { getAllScheduleList } from "./api";

export const HOME_QUERY_KEY = {
  LIST: "list",
};

// 2. 쿼리 작성
export const useGetAllScheduleList = () => {
  return useQuery({
    queryKey: [HOME_QUERY_KEY.LIST],
    queryFn: () => getAllScheduleList(), // API 요청 함수
    // staleTime: 1000 * 60 * 60,
    staleTime: 0,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
