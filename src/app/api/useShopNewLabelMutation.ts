import { ShopItem } from "../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { basicFetch } from "./data-access";

const useShopNewLabelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (label: string) => {
      return basicFetch(`/api/addShopLabel?label=${label}`, {});
    },
    onSettled: (updatedShopping: ShopItem[]) => {
      queryClient.setQueryData(["shopping"], updatedShopping);
    },
  });
};

export default useShopNewLabelMutation;
