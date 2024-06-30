import { useQuery } from "@tanstack/react-query";

import { fetchShoppingList } from "./data-access";
import { ShopItem } from "../types";

const useShoppingQuery = (initialData?: ShopItem[]) =>
  useQuery({
    queryKey: ["shopping"],
    queryFn: fetchShoppingList,
    // select: transformTasks,
    initialData,
    staleTime: 1000,
  });

export default useShoppingQuery;
