import { Task } from "../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { updateTask } from "./data-access";

const useTaskUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSettled: (updatedTasks: Task[]) => {
      queryClient.setQueryData(["tasks"], updatedTasks);
    },
  });
};

export default useTaskUpdateMutation;
