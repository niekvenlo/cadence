import { useQuery } from "@tanstack/react-query";

import { getTasks } from "./data-access";
import { transformTasks } from "./data-transform";

const useTasksQuery = () =>
  useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    select: transformTasks,
  });

export default useTasksQuery;
