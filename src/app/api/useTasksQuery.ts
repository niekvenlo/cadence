import { useQuery } from "@tanstack/react-query";

import { getTasks } from "./data-access";
import { transformTasks } from "./data-transform";
import { Task } from "../types";

const useTasksQuery = (initialData?: Task[]) =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    select: transformTasks,
    initialData,
    staleTime: 1000,
  });

export default useTasksQuery;
