import { useQuery } from "@tanstack/react-query";
import { getAllScheduleList } from "./api";

const QUERY_KEY = {
  LIST: "list",
};

export const useGetAllScheduleList = () => {
  return useQuery({
    queryKey: [QUERY_KEY.LIST],
    queryFn: () => getAllScheduleList(),
  });
};
