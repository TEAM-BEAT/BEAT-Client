import { useQuery } from "@tanstack/react-query";
import { getTicketReq, getTicketRetrieve } from "./api";

// 예매자 목록 조회 API (GET)를 위한 쿼리 작성
const QUERY_KEY = {
  LIST: "list",
};

export const useTicketRetrive = (formData: getTicketReq) => {
  return useQuery({
    queryKey: [QUERY_KEY.LIST],
    queryFn: () => getTicketRetrieve(formData),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
