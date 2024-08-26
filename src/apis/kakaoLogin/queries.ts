import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogout } from "./api";

export const usePostLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: (res) => {
      queryClient.invalidateQueries();
      queryClient.refetchQueries();
    },
  });
};
