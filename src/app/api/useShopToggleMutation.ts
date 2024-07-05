import { ShopItem } from "../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { basicFetch } from "./data-access";

const useShopToggleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (label) => {
      return basicFetch(`/api/toggleShop?label=${label}`, {});
    },
    onSettled: (updatedShopping: ShopItem[]) => {
      queryClient.setQueryData(["shopping"], updatedShopping);
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log({ error, variables, context });
    },
  });
};

export default useShopToggleMutation;
