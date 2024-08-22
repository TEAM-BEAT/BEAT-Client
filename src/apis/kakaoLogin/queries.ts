import { QueryClient, useMutation } from "@tanstack/react-query";
import { postLogout } from "./api";

export const LOGOUT_QUERY_KEY = { LOGOUT: "logout" };

export const usePostLogout = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [LOGOUT_QUERY_KEY.LOGOUT] });
      queryClient.refetchQueries({
        queryKey: [LOGOUT_QUERY_KEY.LOGOUT],
        exact: true,
      });
    },
  });
};
