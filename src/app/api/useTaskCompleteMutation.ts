import { Task } from "../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { completeTask } from "./data-access";

const useTaskCompleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeTask,
    onSettled: (updatedTasks: Task[]) => {
      queryClient.setQueryData(["tasks"], updatedTasks);
    },
  });
};

export default useTaskCompleteMutation;
