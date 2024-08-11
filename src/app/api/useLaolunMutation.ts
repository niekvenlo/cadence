import { Task } from "../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { patchLaolun } from "./data-access";

const useLaolunMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchLaolun,
    onSettled: (data: any) => {
      queryClient.setQueryData(["laolun"], data);
    },
  });
};

export default useLaolunMutation;
