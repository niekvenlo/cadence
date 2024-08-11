import { useQuery } from "@tanstack/react-query";

import { fetchLaolun } from "./data-access";

const useLaolunQuery = () =>
  useQuery({
    queryKey: ["laolun"],
    queryFn: fetchLaolun,
    staleTime: 1000,
  });

export default useLaolunQuery;
